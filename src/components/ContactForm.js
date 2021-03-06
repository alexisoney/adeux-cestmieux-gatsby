import React from 'react';
import styled from 'styled-components';
import {colors} from '../constant/style';

const Section = styled.section`
  width: 100%;
  max-width: 770px;
  margin: 48px auto;
  @media screen and (max-width: 820px) {
    padding-left: 25px;
    padding-right: 25px;
  }
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

export default () => {
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

  return (
    <Section>
      <Form name='contact' data-netlify='true' action='/contact/merci' method='POST'>
        <Row columns={2}>
          <Column>
            <Input name='name' type='text' aria-label='Votre prénom' placeholder='Votre prénom' />
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
              required
              onInput={handleInput}
              onBlur={handleBlur}
            />
            <Error>Oups ! Votre message est vide.</Error>
          </Column>
        </Row>
        <input
          type='hidden'
          name='origin'
          value={typeof window === 'undefined' ? null : window.location.href}
        />
        <input type='hidden' name='form-name' value='contact' />
        <input className='button' type='submit' value='Envoyer' />
      </Form>
    </Section>
  );
};
