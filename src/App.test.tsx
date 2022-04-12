import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const generateRandomString = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

jest.setTimeout(25000);

describe('Start, Pause and Reset Button Basic Functionality Tests.', () => {
  it('Initial setup.', () => {
    render(<App />);
    const linkElement = screen.getByTestId('TimeInSeconds');
    expect(Number.parseFloat(linkElement.textContent!)).toEqual(0);
  })

  it('Check reset button.', () => {
    render(<App />);
    const resetButton = screen.getByTestId('ResetButton');
    expect(resetButton).toHaveTextContent('Reset');
  })

  it('Check start button.', () => {
    render(<App />);
    const startButton = screen.getByTestId('StartButton');
    expect(startButton).toHaveTextContent('Start');
  })

  it('Can change from start to pause.', () => {
    render(<App />);
    const startButton = screen.getByTestId('StartButton');
    fireEvent.click(startButton); // Should change to pause.
    expect(startButton).toHaveTextContent('Pause');
  })

  it('Reset button disabled when in paused state.', () => {
    render(<App />);
    const startButton = screen.getByTestId('StartButton');
    const resetButton = screen.getByTestId('ResetButton');
    fireEvent.click(startButton); // Should change to pause.
    expect(resetButton).toBeDisabled();
  })

  it('Pause button can return back to start.', () => {
    render(<App />);
    const startButton = screen.getByTestId('StartButton');
    fireEvent.click(startButton); // Should change to pause.
    fireEvent.click(startButton); // Should change back to start.
    expect(startButton).toHaveTextContent('Start');
  })

  it('Reset button enabled for paused state.', () => {
    render(<App />);
    const startButton = screen.getByTestId('StartButton');
    const resetButton = screen.getByTestId('ResetButton');
    fireEvent.click(startButton); // Should change to pause.
    fireEvent.click(startButton); // Should change back to start.
    expect(resetButton).toBeEnabled();
  })
})

describe('Name Setting Functionality.', () => {
  it('Check default welcome text.', () => {
    render(<App />);
    const welcomeScreen = screen.getByTestId('WelcomeBanner');
    expect(welcomeScreen).toHaveTextContent('Welcome User!');
  })

  it('Try set an empty string as name.', () => {
    render(<App />);
    const setNameButton = screen.getByTestId('SetNameButton');
    const welcomeScreen = screen.getByTestId('WelcomeBanner');
    fireEvent.click(setNameButton);
    expect(welcomeScreen).toHaveTextContent('Welcome User!');
  })

  it('Set a valid name.', () => {
    render(<App />);
    const setNameButton = screen.getByTestId('SetNameButton');
    const welcomeScreen = screen.getByTestId('WelcomeBanner');

    const textEntry = screen.getByTestId('NameEntry');

    const entry = generateRandomString(1 + Math.random() * 32);
    userEvent.type(textEntry, entry);
    fireEvent.click(setNameButton);

    expect(welcomeScreen).toHaveTextContent(`Welcome ${entry}!`);
  })

  it('Simulate user overflowing name setting.', () => {
    render(<App />);
    const setNameButton = screen.getByTestId('SetNameButton');
    const welcomeScreen = screen.getByTestId('WelcomeBanner');

    const textEntry = screen.getByTestId('NameEntry');

    const entry = generateRandomString(33); // Overflow by 1 digit.
    userEvent.type(textEntry, entry);
    fireEvent.click(setNameButton);

    // Must have the first 32 digits.
    expect(welcomeScreen).toHaveTextContent(`Welcome ${entry.slice(0, 32)}!`);
  })

  it('Text in textbox should be clear after setting name.', () => {
    render(<App />);
    const setNameButton = screen.getByTestId('SetNameButton');
    const textEntry = screen.getByTestId('NameEntry');

    const entry = generateRandomString(1 + Math.random() * 32);
    userEvent.type(textEntry, entry);
    fireEvent.click(setNameButton);

    expect(textEntry).toHaveTextContent('');
  })
})

describe('Timer related tests.', () => {
  let delay_timer: number;
  let small_delay: number;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    delay_timer = 5 + (Math.random() * 5);
    small_delay = 1 + (Math.random() * 3);
    consoleSpy = jest.spyOn(global.console, 'error').mockImplementation((message) => {
      // Remove the printing of warnings that is caused by useEffect changing states.
      if(!message.includes('When testing, code that causes React state updates should be wrapped into act(...):')) global.console.warn(message);
    })
  })

  afterEach(() => {
    consoleSpy.mockRestore();
  })

  it('Basic watch functionality on start and pause.', async () => {
    render(<App />);
    const linkElement = screen.getByTestId('TimeInSeconds');
    const startButton = screen.getByTestId('StartButton');
    fireEvent.click(startButton);

    await new Promise((r) => setTimeout(r, delay_timer * 1000));
    fireEvent.click(startButton);

    const result = Number.parseFloat(linkElement.textContent!);
    expect(result).toBeGreaterThan(delay_timer - 0.1);
    expect(result).toBeLessThan(delay_timer + 0.1);
  })

  it('Pause state works with timer.', async () => {
    render(<App />);
    const linkElement = screen.getByTestId('TimeInSeconds');
    const startButton = screen.getByTestId('StartButton');
    fireEvent.click(startButton);

    await new Promise((r) => setTimeout(r, delay_timer * 1000));
    fireEvent.click(startButton);
    await new Promise((r) => setTimeout(r, small_delay * 1000)); // Simulate small delay_timer of at least 1 second.

    // Pause should prevent timer change after triggered so result should be similar to delay_timer.
    const result = Number.parseFloat(linkElement.textContent!);
    expect(result).toBeGreaterThan(delay_timer - 0.1);
    expect(result).toBeLessThan(delay_timer + 0.1);
  })

  it('Can continue timer after pause.', async () => {
    render(<App />);
    const linkElement = screen.getByTestId('TimeInSeconds');
    const startButton = screen.getByTestId('StartButton');
    fireEvent.click(startButton);

    await new Promise((r) => setTimeout(r, delay_timer * 1000));
    fireEvent.click(startButton); // Pause.
    await new Promise((r) => setTimeout(r, small_delay * 1000));
    fireEvent.click(startButton); // Run timer for small_delay time.
    await new Promise((r) => setTimeout(r, small_delay * 1000));
    fireEvent.click(startButton); // Pause again.

    // Ran for duration delay_timer + 2 small delays. Ensure that pause timer does not count.
    const result = Number.parseFloat(linkElement.textContent!);
    expect(result).toBeGreaterThan(delay_timer + small_delay  - 0.1);
    expect(result).toBeLessThan(delay_timer + small_delay  + 0.1);
  })

  it('Reset works with timer.', async () => {
    render(<App />);
    const linkElement = screen.getByTestId('TimeInSeconds');
    const startButton = screen.getByTestId('StartButton');
    const resetButton = screen.getByTestId('ResetButton');
    fireEvent.click(startButton);

    await new Promise((r) => setTimeout(r, delay_timer * 1000));
    fireEvent.click(startButton);
    await new Promise((r) => setTimeout(r, small_delay * 1000));
    fireEvent.click(resetButton);

    const result = Number.parseFloat(linkElement.textContent!);
    expect(result).toEqual(0.0);
  })

  it('Correct number of decimal places displayed.', async () => {
    render(<App />);
    const linkElement = screen.getByTestId('TimeInSeconds');
    const startButton = screen.getByTestId('StartButton');
    fireEvent.click(startButton);

    await new Promise((r) => setTimeout(r, delay_timer * 1000));
    fireEvent.click(startButton);

    let result = linkElement.textContent!;
    expect(result).toContain('.'); // Decimal place.

    let numberOfDecimalPlaces = result.slice(result.indexOf('.')+1).length;
    expect(numberOfDecimalPlaces).toBeGreaterThanOrEqual(2); // Between 5.00 to 9.99. At least 2 decimal places.

    fireEvent.click(startButton);
    await new Promise((r) => setTimeout(r, delay_timer * 1000));

    result = linkElement.textContent!;
    numberOfDecimalPlaces = result.slice(result.indexOf('.')+1).length;
    expect(numberOfDecimalPlaces).toBeGreaterThanOrEqual(2); // Between 10.00 to 19.99. At least 2 decimal places.
  })
})
