"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Background from '/public/Baixar-fundo-abstrato-hexágono_-conceito-poligonal-de-tecnologia-gratuitamente.png';
import plantumlEncoder from 'plantuml-encoder';

const umlCode = `
@startuml
actor "Người dùng" as User
actor "Quản lý" as Admin

rectangle "Hệ thống đăng nhập" {
    usecase "Đăng nhập bằng Google" as UC_Google
    usecase "Đăng nhập bằng Tên người dùng & Mật khẩu" as UC_UsernamePassword
}

User --> UC_Google
User --> UC_UsernamePassword
Admin --> UC_UsernamePassword

@enduml
  `;

const encodedUML = plantumlEncoder.encode(umlCode);
const umlImageUrl = `http://www.plantuml.com/plantuml/svg/${encodedUML}`;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      router.push('/');
    }
  }, [router]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('token', 'dummy_token');
    localStorage.setItem('isLoggedIn', 'true');
    router.push('/');
  };

  const handleGoogleLogin = () => {
    alert('Đăng nhập bằng Google');
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
          Hệ thống đăng nhập
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
              <h1 className="text-2xl font-bold mb-4">
                {isLogin ? 'Login' : 'Register'}
              </h1>
              {isLogin ? (
                <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
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
                  <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full mt-4">
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="bg-red-500 text-white font-bold py-2 px-4 rounded w-full mt-4"
                  >
                    Login with Google
                  </button>
                  <p className="text-center mt-4">
                    Don&apos;t have an account?{' '}
                    <button type="button" onClick={() => router.push('/im_package/Register')} className="text-blue-500 underline">
                      Register
                    </button>
                  </p>
                </form>
              ) : (
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
                  <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full mt-4">
                    Register
                  </button>
                  <p className="text-center mt-4">
                    Already have an account?{' '}
                    <button type="button" onClick={() => setIsLogin(true)} className="text-blue-500 underline">
                      Login
                    </button>
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;