import React from 'react';
import styled from 'styled-components';
import {colors} from '../constant/style';
// import axios from 'axios';
// import serialize from 'form-serialize';

const Section = styled.section`
  width: 100%;
  max-width: 770px;
  margin: 24px auto 48px;
  @media screen and (max-width: 820px) {
    padding-left: 25px;
    padding-right: 25px;
  }
`;

const H2 = styled.h2`
  margin: 32px 0;
  text-align: center;
`;

const Column = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    flex-flow: column nowrap;
  }
  ${Column} {
    width: ${props =>
      props.columns ? `calc(100% / ${props.columns} - 20px * ${props.columns - 1})` : '100%'};
    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }
`;

const Form = styled.form`
  & + blockquote {
    display: none;
  }
  &.submitted {
    display: none;
    & + blockquote {
      display: block;
    }
  }
`;

const Error = styled.p`
  margin: 8px 0;
  color: ${colors.alpha};
  font-weight: bold;
  font-size: 14px;
  visibility: hidden;
`;

const Input = styled.input`
  width: 100%;
  flex: 0 1 auto;
  height: 50px;
  border: 1px solid ${colors.gamma};
  padding: 10px 0;
  padding-left: 20px;
  &.error + ${Error} {
    visibility: visible;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  border: 1px solid ${colors.gamma};
  padding: 10px 0;
  padding-left: 20px;
  &.error + ${Error} {
    visibility: visible;
  }
`;

export default props => {
  const handleInput = e => {
    if (e.target.checkValidity() || e.target.value.length === 0) {
      e.target.classList.remove('error');
    }
  };

  const handleBlur = e => {
    if (e.target.checkValidity() || e.target.value.length === 0) {
      e.target.classList.remove('error');
    } else {
      e.target.classList.add('error');
    }
  };

  // const handleSubmit = e => {
  //   e.preventDefault();

  //   let containsError = false;
  //   const form = e.target;
  //   const inputs = form.querySelectorAll('input:not([type="submit"]), textarea');

  //   inputs.forEach(input => {
  //     if (!input.checkValidity()) {
  //       input.classList.add('error');
  //       containsError = true;
  //     }
  //   });

  //   if (!containsError) {
  //     axios
  //       .post(form.action, serialize(form))
  //       .then(res => form.classList.add('submitted'))
  //       .catch(err => console.error(err));
  //   }
  // };

  return (
    <Section>
      <H2>Contactez nous</H2>
      <Form name='contact' data-netlify='true' action='/contact/merci'>
        <Row columns={2}>
          <Column>
            <Input
              name='name'
              type='text'
              aria-label='Votre prénom'
              placeholder='Votre prénom'
              required
              onInput={handleInput}
              onBlur={handleBlur}
            />
            <Error>Oups ! Votre prénom est manquant.</Error>
          </Column>
          <Column>
            <Input
              name='email'
              type='email'
              aria-label='Votre e-mail'
              placeholder='Votre e-mail'
              required
              onInput={handleInput}
              onBlur={handleBlur}
            />
            <Error>Oups ! Votre e-mail n'est pas valide.</Error>
          </Column>
        </Row>
        <Row>
          <Column>
            <Textarea
              type='textarea'
              name='message'
              aria-label='Votre message'
              placeholder='Votre message'
              rows={7}
              minLength={50}
              required
              onInput={handleInput}
              onBlur={handleBlur}
            />
            <Error>Oups ! Votre message doit contenir au moins 50 caractères.</Error>
          </Column>
        </Row>
        <input className='button' type='submit' value='Envoyer' />
      </Form>
      {/* <blockquote>
        <p>
          Super ! Votre message a bien été envoyé. Merci beaucoup d'avoir pris le temps de nous
          écrire. Nous vous répondrons le plus vite possible.
        </p>
      </blockquote> */}
    </Section>
  );
};
