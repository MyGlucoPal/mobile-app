import React from 'react';
import renderer from 'react-test-renderer';

import Infobox from '../src/components/InfoBox';

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Infobox title={''} caption={''} />).toJSON();
    //@ts-ignore
    expect(tree.children.length).toBe(2);
  });
});