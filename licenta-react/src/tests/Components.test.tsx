import { render, fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react'

import SnackBarMessage from '../components/Utils/SnackBarMessage'

test('set null message', async () => {
    let msg = "msg";
    const setMsg = jest.fn((val) => msg = val);


    render(<SnackBarMessage message={msg} setMessage={setMsg}/>);

    const btn = screen.getByTestId('icon-button-skb');
    
    fireEvent.click(btn);
    
    
    expect(msg).toEqual(null);
    expect(setMsg).toHaveBeenCalledWith(null);
});

test('open snackbar', () => {
    let msg = "msg";
    const setMsg = jest.fn((val) => msg = val);


    render(<SnackBarMessage message={msg} setMessage={setMsg}/>)

    const snk = screen.getByTestId('skb-test');

    expect(snk).toBeInTheDocument();

});

test('closed snackbar', () => {
    let msg = null;
    const setMsg = jest.fn((val) => msg = val);


    render(<SnackBarMessage message={msg} setMessage={setMsg}/>)

    const snk = screen.queryByTestId('skb-test');

    expect(snk).not.toBeInTheDocument();
});