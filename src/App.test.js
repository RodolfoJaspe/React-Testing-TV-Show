import React from 'react';
import App from "./App";
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { fetchShow } from './api/fetchShow';
import { formatSeasons } from './utils/formatSeasons';
import  userEvent  from '@testing-library/user-event';



jest.mock('./api/fetchShow');
jest.mock('./utils/formatSeasons')

const mockShow = {
    data: {
        name: "",
        image:{},
        summary: "",
        _embedded: {
            episodes:[]
        }
}}

fetchShow.mockResolvedValue(mockShow);

const mockSeasons = []

formatSeasons.mockReturnValue(mockSeasons)


test("App components renders without errors", () => {
    render(<App />);
});

test("Show message if fetching data", () => {
    render(<App />)
    const item =  screen.getByText(/Fetching data/i);
    expect(item).toBeInTheDocument()
})

test("Title renders when data is received", async () => {
    mockShow.data.name = "Stranger Things"

    fetchShow.mockResolvedValueOnce(mockShow);

    render(<App />)
   
    const title = await screen.findByText("Stranger Things");

    expect(title).toBeVisible()

})

test("Dropdown shows seasons when clicked", async () => {
    const mockSeasons = {"season 1":[], "season 2":[], "season 3":[], "season 4":[]}

    formatSeasons.mockReturnValueOnce(mockSeasons)

    render(<App />)

    const seasonSelector = await screen.findByText("Select a season");

    userEvent.click(seasonSelector)

    expect(seasonSelector).toBeVisible()
    expect(await screen.findAllByRole("option")).toHaveLength(4)
    expect(await screen.findByText("season 1")).toBeVisible();

})


