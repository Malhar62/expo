import * as React from 'react';
import {  render, } from "@testing-library/react";
import { WelcomeScreen } from '../app/screens/';

test('render', () => {
    const { getByTestId } = render(<WelcomeScreen navigation={undefined} route={undefined} />)

    const callBtn = getByTestId('btn')
    expect(callBtn).not.toBeNull()
})