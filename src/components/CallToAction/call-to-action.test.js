import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render, act} from '@testing-library/react';

import CallToAction from './call-to-action';

describe('The CallToAction component', () => {
  it('should return null when no arguments are passed', () => {
    const {container} = render(<CallToAction />);
    expect(container.firstChild).toBe(null);
  });

  it('should return an image when an image is passed', () => {
    const {getByTestId} = render(<CallToAction image='foo' />);
    const wrapper = getByTestId('call-to-action');
    const image = getByTestId('call-to-action__image');
    expect(wrapper).toContainElement(image);
  });

  it('should NOT return an image when another parameter is passed', () => {
    const {queryAllByTestId} = render(<CallToAction title='foo' />);
    const image = queryAllByTestId('call-to-action__image');
    expect(image).toHaveLength(0);
  });

  it('should return a title when a title is passed', () => {
    const {getByTestId} = render(<CallToAction title='foo' />);
    const title = getByTestId('call-to-action__title');
    expect(title.textContent).toBe('foo');
  });

  it('should NOT return a title when another parameter is passed', () => {
    const {queryAllByTestId} = render(<CallToAction image='foo' />);
    const title = queryAllByTestId('call-to-action__title');
    expect(title).toHaveLength(0);
  });

  it('should return a description when a description is passed', () => {
    const {getByTestId} = render(<CallToAction description='bar!' />);
    const description = getByTestId('call-to-action__description');
    expect(description.textContent).toBe('bar!');
  });

  it('should NOT return a description when another parameter is passed', () => {
    const {queryAllByTestId} = render(<CallToAction title='foo' />);
    const description = queryAllByTestId('call-to-action__description');
    expect(description).toHaveLength(0);
  });

  it('should return a button when a button text and an external link is passed', () => {
    const link = {
      cached_url: 'https://google.fr',
      fieldtype: 'multilink',
      id: 'febaa1ba-87e9-466d-8ff3-074e147c80e9',
      linktype: 'url',
      url: 'https://google.fr',
      _uid: '35bfbd90-9092-48b4-994e-07794350ea61',
    };
    const {getByTestId} = render(<CallToAction button='click' link={link} />);
    const button = getByTestId('call-to-action__button');
    expect(button.textContent).toBe('click');
  });

  it('should return a button when a button text and an internallink are passed', () => {
    const link = {
      cached_url: 'que-faire-voir-automne-amsterdam',
      fieldtype: 'multilink',
      id: 'febaa1ba-87e9-466d-8ff3-074e147c80e9',
      linktype: 'story',
      url: '',
    };
    const {getByTestId} = render(<CallToAction button='click here' link={link} />);
    const button = getByTestId('call-to-action__button');
    expect(button.textContent).toBe('click here');
  });

  it('should return the correct external link when a button text and a link are passed', () => {
    const link = {
      cached_url: 'https://google.fr',
      fieldtype: 'multilink',
      id: 'febaa1ba-87e9-466d-8ff3-074e147c80e9',
      linktype: 'url',
      url: 'https://google.fr',
      _uid: '35bfbd90-9092-48b4-994e-07794350ea61',
    };
    const {getByTestId} = render(<CallToAction button='click' link={link} />);
    const button = getByTestId('call-to-action__button');
    expect(button).toHaveProperty('href', `${link.url}/`);
  });

  it('should return the correct internal link when a button text and a link are passed', () => {
    const link = {
      cached_url: 'que-faire-voir-automne-amsterdam',
      fieldtype: 'multilink',
      id: 'febaa1ba-87e9-466d-8ff3-074e147c80e9',
      linktype: 'story',
      url: '',
    };
    const {getByTestId} = render(<CallToAction button='click' link={link} />);
    const button = getByTestId('call-to-action__button');
    expect(button).toHaveProperty('href', `http://localhost/${link.cached_url}`);
  });

  it('should NOT return a button when another parameter is passed', () => {
    const {queryAllByTestId} = render(<CallToAction title='foo' />);
    const button = queryAllByTestId('call-to-action__button');
    expect(button).toHaveLength(0);
  });

  it('should NOT return a button when only button text is passed', () => {
    const {queryAllByTestId} = render(<CallToAction button='foo' />);
    const button = queryAllByTestId('call-to-action__button');
    expect(button).toHaveLength(0);
  });

  it('should NOT return a button when only link is passed', () => {
    const link = {
      cached_url: 'https://google.fr',
      fieldtype: 'multilink',
      id: 'febaa1ba-87e9-466d-8ff3-074e147c80e9',
      linktype: 'url',
      url: 'https://google.fr',
      _uid: '35bfbd90-9092-48b4-994e-07794350ea61',
    };
    const {queryAllByTestId} = render(<CallToAction link={link} />);
    const button = queryAllByTestId('call-to-action__button');
    expect(button).toHaveLength(0);
  });

  it('should return the correct link when link is a string', () => {
    const link = 'https://foo-bar.baz';
    const {getByTestId} = render(<CallToAction button='click' link={link} />);
    const button = getByTestId('call-to-action__button');
    expect(button).toHaveProperty('href', `${link}/`);
  });

  it('should convert link when it gets localization JSON object', async () => {
    const mockSuccessResponse = {
      status: "success",
      country: "Netherlands",
      countryCode: "NL",
      region: "NH",
      regionName: "North Holland",
      city: "Amsterdam",
      zip: "1075",
      lat: 52.3528,
      lon: 4.8584,
      timezone: "Europe/Amsterdam",
      isp: "Liberty Global B.V.",
      org: "Ziggo Services B.V.",
      as: "AS6830 Liberty Global B.V.",
      query: "213.127.124.22"
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const link = 'https://foo-bar.baz';
    const localize = '{"NL":"https://my-NL-link"}';
    const {findByTestId} = render(<CallToAction button='click' link={link} localize={localize} />)

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://ip-api.com/json');
    expect(await findByTestId('call-to-action__button')).toHaveAttribute('href', "https://my-NL-link")

    global.fetch.mockClear();
    delete global.fetch;
  })


  it('should NOT convert link when it does NOT get localization JSON object', async () => {
    const mockSuccessResponse = {
      "query": "24.48.0.1f",
      "message": "invalid query",
      "status": "fail"
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const link = 'https://foo-bar.baz';
    const localize = '{"NL":"https://my-NL-link"}';
    const {findByTestId} = render(<CallToAction button='click' link={link} localize={localize} />)

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://ip-api.com/json');
    expect(await findByTestId('call-to-action__button')).toHaveAttribute('href', `${link}`)

    global.fetch.mockClear();
    delete global.fetch;
  })

  it('should NOT convert link when promise is rejected', async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.reject());

    const link = 'https://foo-bar.baz';
    const localize = '{"NL":"https://my-NL-link"}';
    const {findByTestId} = render(<CallToAction button='click' link={link} localize={localize} />)

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('http://ip-api.com/json');
    expect(await findByTestId('call-to-action__button')).toHaveAttribute('href', `${link}`)

    global.fetch.mockClear();
    delete global.fetch;
  })

  it('should convert ALL links when it gets localization JSON object', async () => {
    const mockSuccessResponse = {
      status: "success",
      country: "Netherlands",
      countryCode: "NL",
      region: "NH",
      regionName: "North Holland",
      city: "Amsterdam",
      zip: "1075",
      lat: 52.3528,
      lon: 4.8584,
      timezone: "Europe/Amsterdam",
      isp: "Liberty Global B.V.",
      org: "Ziggo Services B.V.",
      as: "AS6830 Liberty Global B.V.",
      query: "213.127.124.22"
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const link = 'https://foo-bar.baz';
    const localize = '{"NL":"https://my-NL-link"}';
    const {findAllByTestId} = render(
    <>
      <CallToAction button='click' link={link} localize={localize} />
      <CallToAction button='click' link={link} localize={localize} />
      <CallToAction button='click' link={link} localize={localize} />
    </>
    )

    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(global.fetch).toHaveBeenCalledWith('http://ip-api.com/json');

    const buttons = await findAllByTestId('call-to-action__button');
    buttons.forEach(button => {
      expect(button).toHaveAttribute('href', "https://my-NL-link")
    })

    global.fetch.mockClear();
    delete global.fetch;
  })
});
