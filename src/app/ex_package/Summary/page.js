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
top to bottom direction

actor "Nhân viên" as NV
actor "Hệ thống thanh toán" as HTTT
actor "Nhà cung cấp" as NCC

NV --> (Nhập hàng)
NV --> (Hóa đơn)

(Nhập hàng) --> (Thêm sản phẩm) : <<include>>
(Thêm sản phẩm) --> (Danh sách sản phẩm) : <<include>>
(Nhập hàng) --> (Danh sách nhà cung cấp) 


(Danh sách nhà cung cấp) --> (Chọn nhà cung cấp) 
(Danh sách nhà cung cấp) --> (Thêm nhà cung cấp)
(Thêm nhà cung cấp)--> (Chọn nhà cung cấp)
(Chọn nhà cung cấp) --> (Đơn nhập)
(Đơn nhập) --> (Thanh toán) : <<include>>
(Thanh toán) --> (Hóa đơn) :<<include>>
(Hóa đơn) -->(Danh sách sản phẩm):<<include>>


(Hóa đơn) --> (Báo cáo) : <<include>>
HTTT --> (Hóa đơn)
NCC --> (Hóa đơn)

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
            Sơ đồ xuất hàng tại kho
          </motion.h1>
          <motion.div
            variants={animationVariants}
            className="w-full flex justify-center"
          >
            <div className="w-3/5 border-t-2 border-blue-700"></div>
          </motion.div>

          {showUML && (
            <motion.div
              variants={animationVariants}
              className="p-4 rounded-md shadow-md mt-4 flex justify-center"
              style={{ maxHeight: '120vh'}}
            >
              <img src={umlImageUrl} alt="UML Diagram" className="max-w-full h-auto" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}