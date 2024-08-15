import { render } from '@testing-library/react';

import Vacancies from './Vacancies';

describe('Vacancies', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Vacancies />);
    expect(baseElement).toBeTruthy();
  });
});
