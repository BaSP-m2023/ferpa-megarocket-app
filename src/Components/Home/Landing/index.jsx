import React from 'react';
import styles from './landing.module.css';
import { Input, TextArea } from 'Components/Shared/Inputs';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const Landing = () => {
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
            labelText={'Email'}
            placeholder={'Email'}
            nameValue={'email'}
            error={errors.email?.message}
          />
          <div className={styles.inputGroup}>
            <TextArea
              register={register}
              labelText={'Email'}
              nameValue={'description'}
              label={'Description'}
              placeholder={'Activity description'}
              error={errors.description?.message}
            />
          </div>
        </div>
      </section>
      <section className={styles.aboutUs}></section>
      <section className={styles.membership}></section>
    </div>
  );
};

export default Landing;
