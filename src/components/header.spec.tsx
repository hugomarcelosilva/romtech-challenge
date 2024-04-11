import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { Header } from './header'

describe('Header', () => {
  it('should renders without crashing', () => {
    const wrapper = render(
      <>
        <Header />
      </>,
      {
        wrapper: ({ children }) => {
          return (
            <MemoryRouter initialEntries={['/about']}>{children}</MemoryRouter>
          )
        },
      },
    )

    expect(wrapper.getByRole('navigation')).toBeInTheDocument()
  })
})
