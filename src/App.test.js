import React from 'react';
import App from "./App";
import { render } from '@testing-library/react';

test("App components renders without errors", () => {
    render(<App />);
});