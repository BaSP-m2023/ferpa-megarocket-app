import React from 'react';
import styles from './landing.module.css';
import { Input, TextArea, Select } from 'Components/Shared/Inputs';
import Button from 'Components/Shared/Button';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const Landing = () => {
  const motive = [
    {
      _id: 1,
      name: 'I want to know about memberships and costs.',
      value: 'costs'
    },
    {
      _id: 2,
      name: 'I want to make a question or a suggestion.',
      value: 'suggestion'
    },
    {
      _id: 3,
      name: 'I want to make a claim.',
      value: 'claim'
    }
  ];

  const schema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(15)
      .pattern(/^[a-zA-Z-]+$/)
      .messages({
        'string.pattern.base': 'First name must contain only letters'
      }),
    lastName: Joi.string()
      .min(3)
      .max(15)
      .pattern(/^[a-zA-Z-]+$/)
      .messages({
        'string.pattern.base': 'Last name must contain only letters'
      }),
    email: Joi.string()
      .pattern(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/)
      .messages({
        'string.pattern.base': 'Email must be in a valid format (example@example.com)'
      }),
    description: Joi.string()
      .pattern(/^[a-zA-Z0-9.,\s]+$/)
      .min(5)
      .max(250)
      .messages({
        'string.pattern.base': 'Description must contain only letters'
      })
  });

  const {
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  return (
    <div className={styles.container}>
      <section className={styles.introduction}>
        <div className={styles.introductionBox}>
          <h1>MegaRocket GYM</h1>
          <h3>Launch your fitness journey with MegaRocket</h3>
          <p>
            Welcome to Megarocket SA, where we believe in creating a holistic approach to fitness.
            Our gym is a state-of-the-art facility that caters to all your fitness needs. Whether
            you are looking to build muscle, increase flexibility, or simply stay healthy, we have
            everything you need to reach your goals. Our gym is equipped with the latest fitness
            equipment, including cardio machines, weightlifting equipment, and functional training
            areas. We also offer personalized training programs tailored to your specific fitness
            goals, whether you are a beginner or a seasoned athlete. At Megarocket SA, we believe
            that fitness is a lifestyle, not just a hobby. Join us today and start your journey
            towards a healthier, happier you.
          </p>
        </div>
        <div className={styles.introductionImg}>
          <img
            className={styles.logo}
            src="../../assets/images/introduction-img.svg"
            alt="workout"
          ></img>
        </div>
      </section>
      <section className={styles.meetUs}>
        <h2>Meet Us</h2>
        <div className={styles.meetUsBox}>
          <div className={styles.box}>
            <img src="../../assets/images/appointment.svg" alt="appointment"></img>
            <div className={styles.boxRight}>
              <h3>Book an appointment</h3>
              <p>Book your turn for a visit, come and meet us!</p>
            </div>
          </div>
          <div className={styles.box}>
            <img src="../../assets/images/schedule.svg" alt="schedule"></img>
            <div className={styles.boxRight}>
              <h3>Attention schedule</h3>
              <p>You will find all our schedules, adapted to your needs.</p>
            </div>
          </div>
          <div className={styles.box}>
            <img src="../../assets/images/management.svg" alt="management"></img>
            <div className={styles.boxRight}>
              <h3>Membership management</h3>
              <p>
                Here you can manage your membership, we have a variety of them, take a look in the
                GYM section below.
              </p>
            </div>
          </div>
          <div className={styles.box}>
            <img src="../../assets/images/contact.svg" alt="contact"></img>
            <div className={styles.boxRight}>
              <h3>Contact form & suggestions</h3>
              <p>Write to us, our team will always be willing to listen to you!</p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.contactUs}>
        <h2>Contact Us</h2>
        <div className={styles.inputGroup}>
          <Input
            register={register}
            labelText={'First Name'}
            placeholder={'First Name'}
            nameValue={'firstName'}
            error={errors.firstName?.message}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            register={register}
            labelText={'Last Name'}
            placeholder={'Last Name'}
            nameValue={'lastName'}
            error={errors.lastName?.message}
          />
        </div>
        <div className={styles.inputGroup}>
          <Input
            register={register}
            className={styles.input}
            labelText={'Email'}
            placeholder={'Email'}
            nameValue={'email'}
            error={errors.email?.message}
          />
        </div>
        <div className={styles.inputGroup}>
          <Select
            register={register}
            placeholder={'Select motive'}
            options={motive}
            nameValue={'motive'}
            error={errors.hour?.message}
            label={'Motive'}
          />
        </div>
        <div className={styles.inputGroup}>
          <TextArea
            register={register}
            labelText={'Description'}
            nameValue={'description'}
            label={'Description'}
            placeholder={'Activity description'}
            error={errors.description?.message}
          />
        </div>
        <Button variant={'add'} text={'SEND MESSAGE'} submitting />
        <Button text={'RESET'} variant={'white'} />
      </section>
      <section className={styles.aboutUs}>
        <h2>About Us</h2>
        <p>
          Megarocket SA gym was founded in 1995 by a former Olympic athlete named Max Strong. Max
          had always been passionate about fitness and wanted to create a gym that would provide
          people with a welcoming and inclusive environment to pursue their fitness goals.
        </p>
        <p>
          Over the years, Megarocket SA grew into one of the most popular gyms in the city, with a
          thriving community of members who were passionate about fitness. Max continued to run the
          gym until he retired in 2020.
        </p>
        <h3>Our thoughts</h3>
        <img src="../../assets/images/gym-2.svg" alt="gym workout"></img>
        <p>
          At Megarocket SA, we believe that fitness is not just a hobby, it is a lifelong journey.
          Our expert trainers are committed to helping you achieve your goals.
        </p>
        <p>
          We believe that fitness is not a one-size-fits-all solution. That is why we offer a wide
          range of classes and services to cater to every individual is unique needs and
          preferences.
        </p>
        <h3>We are a family</h3>
        <p>
          We are not just a gym - we are a family. At Megarocket SA, you will find a supportive and
          welcoming community that will keep you motivated and inspired to reach your goals.
        </p>
        <img src="../../assets/images/gym-3.svg" alt="fitness culture"></img>
      </section>
      <section className={styles.membership}>
        <h2>Memberships</h2>
        <div className={styles.membershipBox}>
          <div className={styles.membBox}>
            <h3>Black Membership</h3>
            <ol>
              <li>Free pass to the weight room</li>
              <li>Free pass to the lessons (previously enrolled)</li>
              <li>Personalized follow up by a trainer</li>
              <li>Grid visualization</li>
            </ol>
          </div>
          <div className={styles.membBox}>
            <h3>Classic Membership</h3>
            <ol>
              <li>Free pass to the weight room</li>
              <li>Personalized follow up by a trainer</li>
              <li>Grid visualization</li>
            </ol>
          </div>
          <div className={styles.membBox}>
            <h3>Only classes membership</h3>
            <ol>
              <li>Free pass to the weight room</li>
              <li>Grid visualization</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
