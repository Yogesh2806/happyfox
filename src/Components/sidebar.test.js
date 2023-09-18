// Generated by CodiumAI

import { fireEvent, render, waitFor } from "@testing-library/react";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  // Fetches data from API and displays it in cards
  it("should fetch data from API and display it in cards", async () => {
    // Mock the fetch function
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        { id: 1, name: "John Doe", designation: "Manager", team: "Sales" },
        {
          id: 2,
          name: "Jane Smith",
          designation: "Engineer",
          team: "Engineering",
        },
      ]),
    });

    // Render the Sidebar component
    const { getByText } = render(<Sidebar />);

    // Wait for the API call to complete
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Check if the cards are rendered with the correct data
    expect(getByText("Name: John Doe")).toBeInTheDocument();
    expect(getByText("Designation: Manager")).toBeInTheDocument();
    expect(getByText("Team: Sales")).toBeInTheDocument();
    expect(getByText("Name: Jane Smith")).toBeInTheDocument();
    expect(getByText("Designation: Engineer")).toBeInTheDocument();
    expect(getByText("Team: Engineering")).toBeInTheDocument();

    // Restore the original fetch function
    global.fetch.mockRestore();
  });

  // Filters data based on search input and team select
  it("should filter data based on search input and team select", async () => {
    // Mock the fetch function
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        { id: 1, name: "John Doe", designation: "Manager", team: "Sales" },
        {
          id: 2,
          name: "Jane Smith",
          designation: "Engineer",
          team: "Engineering",
        },
      ]),
    });

    // Render the Sidebar component
    const { getByLabelText, getByText } = render(<Sidebar />);

    // Wait for the API call to complete
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Enter search input
    fireEvent.change(getByLabelText("Search"), { target: { value: "John" } });

    // Check if the filtered card is displayed
    expect(getByText("Name: John Doe")).toBeInTheDocument();
    expect(getByText("Designation: Manager")).toBeInTheDocument();
    expect(getByText("Team: Sales")).toBeInTheDocument();
    expect(queryByText("Name: Jane Smith")).not.toBeInTheDocument();
    expect(queryByText("Designation: Engineer")).not.toBeInTheDocument();
    expect(queryByText("Team: Engineering")).not.toBeInTheDocument();

    // Select team from dropdown
    fireEvent.change(getByLabelText("Teams"), {
      target: { value: "Engineering" },
    });

    // Check if the filtered card is displayed
    expect(queryByText("Name: John Doe")).not.toBeInTheDocument();
    expect(queryByText("Designation: Manager")).not.toBeInTheDocument();
    expect(queryByText("Team: Sales")).not.toBeInTheDocument();
    expect(getByText("Name: Jane Smith")).toBeInTheDocument();
    expect(getByText("Designation: Engineer")).toBeInTheDocument();
    expect(getByText("Team: Engineering")).toBeInTheDocument();

    // Restore the original fetch function
    global.fetch.mockRestore();
  });

  // Displays tree component when a card is clicked
  it("should display tree component when a card is clicked", async () => {
    // Mock the fetch function
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest
        .fn()
        .mockResolvedValue([
          { id: 1, name: "John Doe", designation: "Manager", team: "Sales" },
        ]),
    });

    // Render the Sidebar component
    const { getByText, getByTestId } = render(<Sidebar />);

    // Wait for the API call to complete
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Click on the card
    fireEvent.click(getByText("Name: John Doe"));

    // Check if the tree component is displayed
    expect(getByTestId("tree-component")).toBeInTheDocument();

    // Restore the original fetch function
    global.fetch.mockRestore();
  });

  // API call fails, displays error message
  it("should display error message when API call fails", async () => {
    // Mock the fetch function to throw an error
    jest.spyOn(global, "fetch").mockRejectedValue(new Error("API Error"));

    // Render the Sidebar component
    const { getByText } = render(<Sidebar />);

    // Wait for the API call to complete
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Check if the error message is displayed
    expect(getByText("Error fetching data: Error")).toBeInTheDocument();

    // Restore the original fetch function
    global.fetch.mockRestore();
  });

  // Search input and team select do not match any data, displays empty result message
  it("should display empty result message when search input and team select do not match any data", async () => {
    // Mock the fetch function
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest
        .fn()
        .mockResolvedValue([
          { id: 1, name: "John Doe", designation: "Manager", team: "Sales" },
        ]),
    });

    // Render the Sidebar component
    const { getByLabelText, getByText } = render(<Sidebar />);

    // Wait for the API call to complete
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Enter search input that does not match any data
    fireEvent.change(getByLabelText("Search"), { target: { value: "Jane" } });

    // Check if the empty result message is displayed
    expect(getByText("No results found.")).toBeInTheDocument();

    // Select team from dropdown that does not match any data
    fireEvent.change(getByLabelText("Teams"), {
      target: { value: "Engineering" },
    });

    // Check if the empty result message is displayed
    expect(getByText("No results found.")).toBeInTheDocument();

    // Restore the original fetch function
    global.fetch.mockRestore();
  });

  // Clicking on the same card twice, does not change the background color
  it("should not change the background color when clicking on the same card twice", async () => {
    // Mock the fetch function
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest
        .fn()
        .mockResolvedValue([
          { id: 1, name: "John Doe", designation: "Manager", team: "Sales" },
        ]),
    });

    // Render the Sidebar component
    const { getByText } = render(<Sidebar />);

    // Wait for the API call to complete
    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    // Click on the card
    fireEvent.click(getByText("Name: John Doe"));

    // Check if the background color is changed
    expect(getByText("Name: John Doe")).toHaveStyle(
      "background-color: rgb(230, 230, 230)"
    );

    // Click on the same card again
    fireEvent.click(getByText("Name: John Doe"));

    // Check if the background color is not changed
    expect(getByText("Name: John Doe")).not.toHaveStyle(
      "background-color: rgb(230, 230, 230)"
    );

    // Restore the original fetch function
    global.fetch.mockRestore();
  });
});
