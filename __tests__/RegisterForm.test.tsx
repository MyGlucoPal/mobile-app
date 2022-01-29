import React from 'react';
import { render, fireEvent, act } from "@testing-library/react-native";

import LoginForm from '../src/components/LoginForm';

it("renders default elements", () => {
    const { getAllByText, getByPlaceholderText } = render(<LoginForm onSignUpPress={() => {}} />);
  
    expect(getAllByText("SUBMIT").length).toBe(1);
    getByPlaceholderText("Email");
    getByPlaceholderText("Password");
  });