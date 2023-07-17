import React from 'react';
import styles from './landing.module.css';
import { Link } from 'react-router-dom';
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
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema)
  });

  const handleReset = () => {
    reset();
  };

  return (
    <div className={styles.container}>
      <section className={styles.introduction}>
        <div className={styles.introductionBox}>
          <h1 className={styles.title}>
            <span className={styles.megaColor}>Mega</span>Rocket GYM
          </h1>
          <h3 className={styles.informationTitle}>Launch your fitness journey with MegaRocket</h3>
          <div className={styles.introductionText}>
            <p className={styles.text}>
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
            <div className={styles.joinUs}>
              <a className={styles.scrollableLink} href="#Memberships">
                JOIN US
              </a>
            </div>
          </div>
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
        <h2 className={styles.subTitle}>Meet Us</h2>
        <div className={styles.meetUsBox}>
          <div className={styles.box}>
            <img src="../../assets/images/appointment.svg" alt="appointment"></img>
            <div className={styles.boxRight}>
              <h3 className={styles.informationTitle}>Book an appointment</h3>
              <p className={styles.text}>Book your turn for a visit, come and meet us!</p>
            </div>
          </div>
          <div className={styles.box}>
            <img src="../../assets/images/schedule.svg" alt="schedule"></img>
            <div className={styles.boxRight}>
              <h3 className={styles.informationTitle}>Attention schedule</h3>
              <p className={styles.text}>You will find all our schedules, adapted to your needs.</p>
            </div>
          </div>
          <div className={styles.box}>
            <img src="../../assets/images/management.svg" alt="management"></img>
            <div className={styles.boxRight}>
              <h3 className={styles.informationTitle}>Membership management</h3>
              <p className={styles.text}>
                Here you can manage your membership, we have a variety of them, take a look in the
                GYM section below.
              </p>
            </div>
          </div>
          <div className={styles.box}>
            <img src="../../assets/images/contact.svg" alt="contact"></img>
            <div className={styles.boxRight}>
              <h3 className={styles.informationTitle}>Contact form & suggestions</h3>
              <p className={styles.text}>
                Write to us, our team will always be willing to listen to you!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.contactUs}>
        <div className={styles.element}>
          <h2 className={styles.subTitle}>Contact Us</h2>
          <form>
            <div className={styles.inputs}>
              <div className={styles.firstInputs}>
                <div className={styles.inputGroup}>
                  <Input
                    register={register}
                    dark
                    labelText={'First Name'}
                    placeholder={'First Name'}
                    nameValue={'firstName'}
                    error={errors.firstName?.message}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <Input
                    register={register}
                    dark
                    labelText={'Last Name'}
                    placeholder={'Last Name'}
                    nameValue={'lastName'}
                    error={errors.lastName?.message}
                  />
                </div>
              </div>
              <div className={styles.secondInputs}>
                <div className={styles.inputGroup}>
                  <Input
                    register={register}
                    className={styles.input}
                    dark
                    labelText={'Email'}
                    placeholder={'Email'}
                    nameValue={'email'}
                    error={errors.email?.message}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <Select
                    register={register}
                    dark
                    placeholder={'Select motive'}
                    options={motive}
                    nameValue={'motive'}
                    error={errors.hour?.message}
                    label={'Motive'}
                  />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <TextArea
                  register={register}
                  dark
                  labelText={'Description'}
                  nameValue={'description'}
                  label={'Description'}
                  placeholder={'Activity description'}
                  error={errors.description?.message}
                />
              </div>
              <div className={styles.contactButtons}>
                <Button variant={'add'} text={'SEND MESSAGE'} submitting />
                <Button text={'RESET'} variant={'white'} clickAction={handleReset} />
              </div>
            </div>
          </form>
        </div>
      </section>
      <section className={styles.aboutUs}>
        <h2 className={styles.subTitle}>About Us</h2>
        <p className={styles.text}>
          After Maxs retirement, his son, Alex Strong, took over the leadership of Megarocket SA
          gym. Alex had grown up in the gym and shared the same passion for fitness as his father.
          He decided to keep Maxs vision alive by providing a positive and motivating environment
          for the members of Megarocket.
        </p>
        <p className={styles.text}>
          Under Alexss guidance, Megarocket SA gym has undergone a series of significant
          improvements. New and modern facilities have been incorporated, state-of-the-art equipment
          has been added, and a wide range of fitness classes have been introduced to cater to the
          diverse needs of the members. Additionally, strategic partnerships have been established
          with leading nutritionists and personal trainers to offer comprehensive wellness programs
          for the members.
        </p>
        <p className={styles.text}>
          Despite the growth and success, the gym has managed to maintain its sense of community.
          Regular social events, group challenges, and charity initiatives are organized to foster a
          strong bond among the members. Megarocket SA gym has become not just a place to work out
          but a hub for like-minded individuals who support and motivate each other on their fitness
          journeys.
        </p>
        <p className={styles.text}>
          The legacy of Max Strong lives on through Megarocket SA gym, as it continues to inspire
          and transform lives through fitness. With Alexs leadership and the dedication of the
          staff, the gym remains committed to providing a welcoming and inclusive space for people
          of all fitness levels to pursue their health and wellness goals.
        </p>
        <h3 className={styles.informationTitle}>Our thoughts</h3>
        <div className={styles.aboutUsShadow}>
          <div className={styles.aboutUsBox}>
            <img
              className={styles.aboutImg}
              src="../../assets/images/gym-about-us.jpeg"
              alt="gym workout"
            ></img>
            <div>
              <p className={styles.text}>
                At Megarocket SA, we understand that each persons fitness journey is unique and
                personal. That is why our expert trainers are dedicated to providing personalized
                guidance and support to help you achieve your specific goals. Whether you are aiming
                to lose weight, build muscle, improve flexibility, or enhance overall wellness, our
                trainers will work closely with you to create a customized workout plan that fits
                your needs and abilities.
              </p>
              <p className={styles.text}>
                In addition to our personalized approach, we also offer a diverse range of classes
                and services to cater to different fitness preferences. From high-intensity interval
                training (HIIT) and strength training to yoga, pilates, and dance, we have a class
                for everyone. Our certified instructors bring their passion and expertise to each
                session, ensuring that you have a rewarding and enjoyable experience while pushing
                your limits and reaching new heights.
              </p>
            </div>
          </div>
        </div>
        <h3 className={styles.informationTitle}>We are a family</h3>
        <div className={styles.aboutUsShadow}>
          <div className={styles.aboutUsBox}>
            <div>
              <p className={styles.text}>
                At Megarocket SA, we pride ourselves on being more than just a gym; we are a
                close-knit family. From the moment you step through our doors, you will feel the
                warm and inclusive atmosphere that permeates our facility. Our members create a
                supportive community that encourages and uplifts each other, making every visit to
                Megarocket SA a motivating and enjoyable experience.
              </p>
              <p className={styles.text}>
                We believe that fitness is not a solitary journey but a shared endeavor. Our
                dedicated staff and trainers are passionate about helping you succeed in your
                fitness goals. Whether you need guidance on proper form, nutritional advice, or
                simply some words of encouragement, our friendly and knowledgeable team is always
                available to support you throughout your fitness journey.
              </p>
              <p className={styles.text}>
                Join Megarocket SA today and become part of our fitness family. Together, we all
                celebrate victories, overcome challenges, and create lasting memories as we strive
                towards a healthier and happier lifestyle.
              </p>
            </div>
            <img
              className={styles.aboutImgDos}
              src="../../assets/images/gym-3.svg"
              alt="fitness culture"
            ></img>
          </div>
        </div>
      </section>
      <section className={styles.membership} id="Memberships">
        <h2 className={styles.subTitle}>Memberships</h2>
        <div className={styles.membershipBox}>
          <div className={styles.membBox}>
            <h3 className={styles.informationTitle}>Black Membership</h3>
            <ul>
              <li>Free pass to the weight room</li>
              <li>Free pass to the lessons (previously enrolled)</li>
              <li>Personalized follow up by a trainer</li>
              <li>Grid visualization</li>
            </ul>
            <div className={styles.membIconBox}>
              <img
                className={styles.membIcon}
                src="../../assets/images/rocket-black.svg"
                alt="gym icon"
              ></img>
              <Link to="/home/signup" className={styles.link}>
                <p>150 $</p>
              </Link>
            </div>
          </div>
          <div className={styles.membBox}>
            <h3 className={styles.informationTitle}>Classic Membership</h3>
            <ul>
              <li>Free pass to the weight room</li>
              <li>Personalized follow up by a trainer</li>
              <li>Grid visualization</li>
            </ul>
            <div className={styles.membIconBox}>
              <img
                className={styles.membIcon}
                src="../../assets/images/rocket-classic.svg"
                alt="gym icon"
              ></img>
              <Link to="/home/signup" className={styles.link}>
                <p>100 $</p>
              </Link>
            </div>
          </div>
          <div className={styles.membBox}>
            <h3 className={styles.informationTitle}>Only classes membership</h3>
            <ul>
              <li>Free pass to the weight room</li>
              <li>Grid visualization</li>
            </ul>
            <div className={styles.membIconBox}>
              <img
                className={styles.membIcon}
                src="../../assets/images/rocket-onlyclasses.svg"
                alt="gym icon"
              ></img>
              <Link to="/home/signup" className={styles.link}>
                <p>50 $ </p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
