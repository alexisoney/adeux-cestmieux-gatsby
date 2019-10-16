import {getTimeToRead} from './utils';

describe('Utils functions', () => {
  describe('getTimeToRead', () => {
    it('should return 0 when no blocks are passed', () => {
      const result = () => getTimeToRead();
      expect(result).toThrow('blocks is undefined');
    });

    it('should return 0 when no text component is passed', () => {
      const result = getTimeToRead([]);
      expect(result).toBe(0);
    });

    it('should round up the reading time', () => {
      let content = '';
      for (let i = 0, n = 210; i < n; i++) {
        content += 'foo';
        if (i !== n) content += ' ';
      }
      const result = getTimeToRead([{component: 'text', content}]);
      expect(result).toBe(2);
    });

    it('should return the reading time', () => {
      let content = '';
      for (let i = 0, n = 199; i < n; i++) {
        content += 'foo';
        if (i !== n) content += ' ';
      }
      const result = getTimeToRead([{component: 'text', content}]);
      expect(result).toBe(1);
    });
  });
});
