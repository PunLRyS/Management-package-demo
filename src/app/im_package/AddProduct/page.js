"use client";
import { useState } from 'react';
import React from 'react';
import Nav_bar from '@/app/components/Nav/Nav_bar';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Background from '/public/Baixar-fundo-abstrato-hexágono_-conceito-poligonal-de-tecnologia-gratuitamente.png';
import plantumlEncoder from 'plantuml-encoder';

export default function AddProductPage() {
  const [showUML, setShowUML] = useState(true);

  const animationVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const umlCode = `
@startuml
actor NhanVien
actor NhaCungCap
actor HeThongThanhToan
actor QuanLyKho

rectangle "He Thong Nhap Hang" {
    usecase "Nhap hang" as UC1
    usecase "Danh sach san pham" as UC2
    usecase "Them san pham" as UC3
    usecase "Danh sach them" as UC4
    usecase "OK" as UC5
    usecase "Chon nha cung cap" as UC6
    usecase "Don nhap" as UC7
}

NhanVien --> UC1
NhanVien --> UC2
NhanVien --> UC3
NhanVien --> UC4
NhanVien --> UC5
NhanVien --> UC6
NhanVien --> UC7

UC1 <.. UC2 : <<include>>
UC3 <.. UC4 : <<include>>
UC5 <.. UC6 : <<include>>
UC6 <.. UC7 : <<include>>

UC7 --> NhaCungCap
UC7 --> HeThongThanhToan
UC7 --> QuanLyKho
@enduml
  `;

  const encodedUML = plantumlEncoder.encode(umlCode);
  const umlImageUrl = `http://www.plantuml.com/plantuml/svg/${encodedUML}`;

  return (
    <>
      <Nav_bar />
      <Image
        alt="Mountains"
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
      <motion.div
        initial="hidden"
        animate="visible"
        variants={animationVariants}
        className="pt-16 relative"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animationVariants}
          className="flex flex-col space-y-4 mt-8"
        >
          <motion.h1
            variants={animationVariants}
            className="text-2xl font-bold mr-4 text-center"
          >
            Sơ đồ nhập hàng tại kho
          </motion.h1>
          <motion.div
            variants={animationVariants}
            className="w-full flex justify-center"
          >
            <div className="w-3/5 border-t-2 border-blue-700"></div>
          </motion.div>

          <motion.div
            variants={animationVariants}
            className="flex mx-auto gap-x-4"
          >
          </motion.div>

          {showUML && (
            <motion.div
              variants={animationVariants}
              className="p-4 rounded-md shadow-md mt-4 flex justify-center overflow-hidden"
              style={{ maxHeight: '80vh' }}
            >
              <img src={umlImageUrl} alt="UML Diagram" className="max-w-full h-auto" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}

