"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Background from '/public/Baixar-fundo-abstrato-hexágono_-conceito-poligonal-de-tecnologia-gratuitamente.png';
import plantumlEncoder from 'plantuml-encoder';

const umlCode = `
@startuml
actor "Người dùng" as User

rectangle "Hệ thống đăng ký" {
    usecase "Nhập tên người dùng" as UC_Username
    usecase "Nhập mật khẩu" as UC_Password
    usecase "Nhập lại mật khẩu" as UC_ConfirmPassword
    usecase "Kiểm tra mật khẩu" as UC_CheckPassword
    usecase "Đăng ký" as UC_Register
}

User --> UC_Username
User --> UC_Password
User --> UC_ConfirmPassword
UC_Password --> UC_CheckPassword : <<include>>
UC_ConfirmPassword --> UC_CheckPassword : <<include>>
UC_CheckPassword --> UC_Register : <<include>>
@enduml
  `;

const encodedUML = plantumlEncoder.encode(umlCode);
const umlImageUrl = `http://www.plantuml.com/plantuml/svg/${encodedUML}`;

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Registration successful');
    router.push('/im_package/Login');
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: { width: '60%', transition: { duration: 1 } },
  };

  return (
    <>
      <Image
        alt="Background"
        src={Background}
        placeholder="blur"
        quality={100}
        sizes="100vw"
        style={{
          objectFit: 'cover',
          position: 'fixed',
        }}
        className="blur-sm absolute w-screen h-screen"
      />
      <div className="flex relative flex-col space-y-4 mt-8 pt-16">
        <motion.h1
          className="text-4xl font-bold text-center text-blue-800 mb-8"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Đăng ký
        </motion.h1>
        <div className="w-full flex justify-center">
          <motion.div
            className="border-t-2 border-blue-700"
            variants={lineVariants}
            initial="hidden"
            animate="visible"
          ></motion.div>
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex w-full max-w-4xl space-x-8">
            <motion.div
              className="w-1/2 flex justify-center items-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Image src={umlImageUrl} alt="UML Diagram" className="max-w-full h-auto" />
            </motion.div>
            <motion.div
              className="w-1/2 flex flex-col justify-center items-center border border-gray-300 p-8 rounded-lg shadow-lg"
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-2xl font-bold mb-4">Register</h1>
              <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                <label>
                  Username:
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </label>
                <label>
                  Password:
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </label>
                <label>
                  Confirm Password:
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="border border-gray-300 p-2 rounded w-full"
                  />
                </label>
                <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full mt-4">
                  Register
                </button>
                <p className="text-center mt-4">
                  Already have an account?{' '}
                  <button type="button" onClick={() => router.push('/im_package/Login')} className="text-blue-500 underline">
                    Login
                  </button>
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;