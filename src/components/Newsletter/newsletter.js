import React, {useRef} from 'react';

const Newsletter = () => {
  const input = useRef();

  return (
    <aside data-testid='newsletter' className='newsletter'>
      <h2 data-testid='newsletter__title' className='newsletter__title'>
        Newsletter
      </h2>
      <p data-testid='newsletter__description' className='newsletter__description'>
        Recevez par e-mail les mises à jours du blog.
      </p>
      <form
        data-testid='newsletter__form'
        className='newsletter__form'
        action='https://adeux-cestmieux.us5.list-manage.com/subscribe/post?u=e14544998eedefe9000e1751a&amp;id=b7be3dd3cc'
        method='post'
      >
        <input
          ref={input}
          data-testid='newsletter__input'
          className='newsletter__input'
          aria-label='Adresse e-mail'
          placeholder='E-mail'
          type='email'
          name='EMAIL'
          required
        />
        <input type='hidden' name='POSITION' value='FOOTER' />
        <button
          data-testid='newsletter__button'
          className='button button--filled newsletter__button'
          aria-label="S'inscrire à la newsletter"
        >
          S'inscrire
        </button>
      </form>
    </aside>
  );
};

export default Newsletter;
