// logdetails/tests/page.test.jsx

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LogDetailsPage from "../page"; // Import the component you're testing
import { useSearchParams, useRouter } from "next/navigation";

// Mock the next/navigation hooks so we can control their return values in tests
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

describe("LogDetailsPage", () => {
  // We'll use this mock to check navigation calls (like router.push)
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Make useRouter return an object that has a push method we can spy on
    useRouter.mockReturnValue({ push: pushMock });
  });

  test("renders default values based on query parameters", () => {
    // Mock the URL query params
    useSearchParams.mockReturnValue({
      get: (key) => {
        const params = {
          name: "Test Song",
          category: "track", // Should map to "Music" inside the component
          image: "test-image.jpg",
        };
        return params[key];
      },
    });

    // Render the component
    render(<LogDetailsPage />);

    // Check that the text "I listened to: Test Song" appears
    expect(screen.getByText(/I listened to: Test Song/i)).toBeInTheDocument();

    // The category <select> should be "Music" because 'track' maps to 'Music'
    const categorySelect = screen.getByRole("combobox");
    expect(categorySelect.value).toBe("Music");

    // The image should have the correct src and alt attributes
    const image = screen.getByAltText(/Test Song/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });

  test('navigates back to /log when "Back" button is clicked', () => {
    // Provide empty search params for this test
    useSearchParams.mockReturnValue({
      get: () => null,
    });

    // Render the component
    render(<LogDetailsPage />);

    // Click the "Back" button
    const backButton = screen.getByRole("button", { name: /Back/i });
    fireEvent.click(backButton);

    // Check that router.push was called with "/log"
    expect(pushMock).toHaveBeenCalledWith("/log");
  });

  test("saves log and navigates to /logtable on success", async () => {
    // Mock the URL query params
    useSearchParams.mockReturnValue({
      get: (key) => {
        const params = {
          name: "Test Song",
          category: "track",
          image: "test-image.jpg",
        };
        return params[key];
      },
    });

    // Mock sessionStorage items
    sessionStorage.setItem("userData", JSON.stringify({ id: 1, name: "User" }));
    sessionStorage.setItem("access-token", "dummy-token");

    // Use fake timers to handle the 1.5s delay in handleSave
    jest.useFakeTimers();

    // Mock the global fetch function to return a successful response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
      })
    );

    // Render the component
    render(<LogDetailsPage />);

    // Click the "Save" button
    const saveButton = screen.getByRole("button", { name: /Save/i });
    fireEvent.click(saveButton);

    // The button should now be disabled and show "Saving..."
    expect(saveButton).toBeDisabled();
    expect(screen.getByText(/Saving.../i)).toBeInTheDocument();

    // Fast-forward the timer by 1.5s to trigger the setTimeout callback
    jest.advanceTimersByTime(1500);

    // Wait for navigation to /logtable
    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/logtable");
    });

    // Clean up mocks
    global.fetch.mockRestore();
    jest.useRealTimers();
  });
});
