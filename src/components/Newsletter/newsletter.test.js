import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';

import Newsletter from './';

describe('Newsletter', () => {
  let container;
  let getByTestId;
  beforeEach(() => {
    const queries = render(<Newsletter />);
    container = queries.container;
    getByTestId = queries.getByTestId;
  });

  it('should not return null', () => {
    expect(container.firstChild).not.toBeNull();
  });

  it('should be an aside', () => {
    const wrapper = getByTestId('newsletter');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.tagName).toBe('ASIDE');
  });

  it('should return a title', () => {
    const title = getByTestId('newsletter__title');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H2');
    expect(title.textContent).toBeTruthy();
  });

  it('should return a description', () => {
    const description = getByTestId('newsletter__description');
    expect(description).toBeInTheDocument();
    expect(description.textContent).toBeTruthy();
  });

  it('should have a form', () => {
    const form = getByTestId('newsletter__form');
    expect(form).toBeInTheDocument();
    expect(form.tagName).toBe('FORM');
  });

  it('should return an e-mail input', () => {
    const input = getByTestId('newsletter__input');
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('aria-label');
    expect(input).toHaveAttribute('placeholder');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toBeRequired();
  });

  it('should return a button', () => {
    const button = getByTestId('newsletter__button');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('aria-label');
    expect(button.textContent).toBeTruthy();
  });

  it('should have a form becoming valid', () => {
    const form = getByTestId('newsletter__form');
    const input = getByTestId('newsletter__input');

    expect(form).toBeInvalid();

    input.value = 'not-an-e-mail';
    expect(form).toBeInvalid();

    input.value = 'email@provider.com';
    expect(form).toBeValid();
  });
});
