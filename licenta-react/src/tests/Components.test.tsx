import { render, fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react'

import SnackBarMessage from '../components/Utils/SnackBarMessage'

test('set null message', async () => {
    // arrange
    let msg = "msg";
    const setMsg = jest.fn((val) => msg = val);

    // act
    render(<SnackBarMessage message={msg} setMessage={setMsg}/>);

    const btn = screen.getByTestId('icon-button-skb');
    
    fireEvent.click(btn);
    
    // assert
    expect(msg).toEqual(null);
    expect(setMsg).toHaveBeenCalledWith(null);
});

test('open snackbar', () => {
    // arrange
    let msg = "msg";
    const setMsg = jest.fn((val) => msg = val);

    // act
    render(<SnackBarMessage message={msg} setMessage={setMsg}/>)

    const snk = screen.getByTestId('skb-test');

    // assert
    expect(snk).toBeInTheDocument();

});

test('closed snackbar', () => {
    // arrange
    let msg = null;
    const setMsg = jest.fn((val) => msg = val);

    // act
    render(<SnackBarMessage message={msg} setMessage={setMsg}/>)

    const snk = screen.queryByTestId('skb-test');

    // expect
    expect(snk).not.toBeInTheDocument();
});