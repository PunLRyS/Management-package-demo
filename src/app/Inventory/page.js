"use client";
import Nav_bar from '@/app/components/Nav/Nav_bar';
import React from 'react';
import { useEffect, useState } from "react";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Background from '/public/Baixar-fundo-abstrato-hexágono_-conceito-poligonal-de-tecnologia-gratuitamente.png';
import plantumlEncoder from 'plantuml-encoder';

const umlCode = `
@startuml
left to right direction

class "Xuất hàng" {
  - Mã phiếu: string
  - Ngày xuất: date
  - Khách hàng: string
  - Danh sách sản phẩm: List
  - Tổng tiền: double
}

class "Nhà cung cấp" {
  - Tên: string
  - Địa chỉ: string
  - SDT: double
}

class "Đại lý" {
  - Tên: string
  - Địa chỉ: string
  - SDT: double
}

class "Xuất hóa đơn" {
  - Mã xuất: string
  - Tổng tiền: double
}

class "Nhập hàng" {
  - Mã nhập: string
  - Mã hàng: string
  - Ngày nhập: date
  - Nhà cung cấp: string
  - Danh sách sản phẩm: List
  - Tổng tiền: double
}

class "Kho hàng" {
  - Tên: string
  - Mã hàng: string
  - Số lượng: int
  - Giá: double
  - Tổng giá: double
}

class "Xuất hóa đơn (Nhập hàng)" {
  - Mã nhập: string
  - Tổng tiền: double
}

class "Hàng hóa" {
  - Mã hàng: string
  - Tên: string
  - Loại hàng: string
  - Số lượng: int
  - Giá: double
}

class "Tồn kho" {
  - Mã hàng: string
  - Hạn sử dụng: date
  - Danh sách sản phẩm: List
  - Tổng tiền: double
}

"Xuất hàng" --> "Đại lý"
"Xuất hàng" --> "Xuất hóa đơn"
"Nhập hàng" --> "Nhà cung cấp"
"Nhập hàng" --> "Kho hàng"
"Nhập hàng" --> "Xuất hóa đơn (Nhập hàng)"
"Kho hàng" --> "Hàng hóa"
"Hàng hóa" --> "Tồn kho"

@enduml
`;

const encodedUML = plantumlEncoder.encode(umlCode);
const umlImageUrl = `http://www.plantuml.com/plantuml/svg/${encodedUML}`;

export default function InventoryPage() {

  const numberFormatter = new Intl.NumberFormat('vi-VN');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

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
      <div className="pt-16 relative">
        <div className="container mx-auto mt-8">
          <motion.h1
            className="text-2xl font-bold text-center text-blue-800"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            Sơ đồ class
          </motion.h1>
          <motion.div
            className="overflow-x-auto mt-4"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.img
              src={umlImageUrl}
              alt="UML Diagram"
              className="max-w-full h-auto mb-4 items-center justify-center mx-auto"
              initial="hidden"
              animate="visible"
              variants={itemVariants}
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}