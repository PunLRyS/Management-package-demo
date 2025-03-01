"use client";
import Nav_bar from '@/app/components/Nav/Nav_bar';
import React from 'react';
import { useEffect, useState } from "react";
import Image from 'next/image';
import Background from '/public/Baixar-fundo-abstrato-hexágono_-conceito-poligonal-de-tecnologia-gratuitamente.png';

export default function InventoryPage() {
  const [backendProducts, setBackendProducts] = useState([
    { id: 1, ma: 'HH001', ten: 'Sản phẩm 1', soLuong: 10, giaNhap: 50000 },
    { id: 2, ma: 'HH002', ten: 'Sản phẩm 2', soLuong: 20, giaNhap: 75000 },
  ]);

  const totalValue = backendProducts.reduce((total, item) => {
    const itemTotal = item.soLuong * item.giaNhap;
    return total + (isNaN(itemTotal) ? 0 : itemTotal);
  }, 0);

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
          <h1 className="text-2xl font-bold text-center text-blue-800">
            Danh sách hàng hóa
          </h1>
          <div className="overflow-x-auto mt-4">
            <table className="bg-white border border-blue-400 w-full">
              <thead>
                <tr className="bg-blue-200 text-blue-900">
                  <th className="name-data border border-blue-400 p-2">Số thứ tự</th>
                  <th className="name-data border border-blue-400 p-2">Mã hàng</th>
                  <th className="name-data border border-blue-400 p-2">Tên hàng</th>
                  <th className="name-data border border-blue-400 p-2">Số lượng</th>
                  <th className="name-data border border-blue-400 p-2">Giá</th>
                  <th className="name-data border border-blue-400 p-2">Tổng giá</th>
                </tr>
              </thead>
              <tbody>
                {backendProducts.map((item, index) => {
                  const totalAmount = item.soLuong * item.giaNhap;
                  return (
                    <tr key={item.id} className="hover:bg-blue-100">
                      <td className="data-inventory border border-blue-400 p-2 text-center">
                        {index + 1}
                      </td>
                      <td className="data-inventory border border-blue-400 p-2 text-center">
                        {item.ma}
                      </td>
                      <td className="data-inventory border border-blue-400 p-2 text-center">
                        {item.ten}
                      </td>
                      <td className="data-inventory border border-blue-400 p-2 text-center">
                        {item.soLuong}
                      </td>
                      <td className="data-inventory border border-blue-400 p-2 text-center">
                        {item.giaNhap.toLocaleString()} VNĐ
                      </td>
                      <td className="data-inventory border border-blue-400 p-2 text-center">
                        {totalAmount.toLocaleString()} VNĐ
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="5" className="border border-blue-400 p-2 text-right font-bold">
                    Tổng giá trị hàng hóa:
                  </td>
                  <td className="border border-blue-400 p-2 text-right">
                    {totalValue.toLocaleString()} VNĐ
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}