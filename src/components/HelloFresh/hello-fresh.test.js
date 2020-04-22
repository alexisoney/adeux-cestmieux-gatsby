import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';

import {default as HelloFresh, ipDataApi} from './hello-fresh';

describe('<HelloFresh />', () => {
  it('should call right API', async () => {
    global.fetch = jest.fn().mockImplementation(() => {});
  
    render(<HelloFresh/>)
  
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(ipDataApi);

    global.fetch.mockClear();
    delete global.fetch;
  })
})

