import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
   const virtualDOM = render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    const header = virtualDOM.getByText("Contact Form");

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    const firstNameInput = screen.getByLabelText("First Name");
    userEvent.type(firstNameInput, "rock");
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(firstNameInput, "");
    userEvent.type(lastNameInput, "");
    userEvent.type(emailInput, "");
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(firstNameInput, "Trevor");
    userEvent.type(lastNameInput, "Mandina");
    userEvent.type(emailInput, "");
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(emailInput, "tman154gmail.com");
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    const lastNameInput = screen.getByLabelText("Last Name");
    const submitButton = screen.getByRole("button", { value: /submit/i});
    userEvent.type(lastNameInput, "");
    userEvent.click(submitButton);

});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const submitButton = screen.getByRole("button", { value: /submit/i});
    const emailInput = screen.getByLabelText(/email/i);
    userEvent.type(firstNameInput, "Trevor");
    userEvent.type(lastNameInput, "Mandina");
    userEvent.type(emailInput, "trevorm157@hotmail.com");
    userEvent.click(submitButton);
});

test('renders all fields text when all fields are submitted.', async () => {
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const submitButton = screen.getByRole("button", { value: /submit/i});
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i)
    userEvent.type(firstNameInput, "Trevor");
    userEvent.type(lastNameInput, "Mandina");
    userEvent.type(emailInput, "trevorm157@hotmail.com");
    userEvent.type(messageInput, "Hey, I was just checking in on you!")
    userEvent.click(submitButton);
});