"use client";
import { Inter } from 'next/font/google';
import Nav_bar from "../components/Nav/Nav_bar";
import VideoComponent from "../components/VideoComponent";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Background from '/public/Baixar-fundo-abstrato-hexágono_-conceito-poligonal-de-tecnologia-gratuitamente.png';
import plantumlEncoder from 'plantuml-encoder';

const animationVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const umlCode = `
@startuml

' Lược đồ hoạt động (Activity Diagram) cho hệ thống quản lý kho hàng

start

:Nhập hàng từ đại lý;
:Nhập thông tin hàng hóa;
:Nhập Tên hàng, Mã hàng hóa, Số lượng, Đơn giá, Ngày nhập hàng;
:Tính Tổng giá;
:Nhập thông tin nhà cung cấp  (Tên nhà cung cấp, Mã nhà cung cấp, Địa chỉ, SĐT);
:Kiểm tra thông tin hàng hóa;
if (Hàng hóa hợp lệ?) then (Có)
    :Cập nhật kho hàng;
    :Tạo hóa đơn nhập;
else (Không)
    :Thông báo lỗi;
endif

:Đặt hàng xuất;
:Chọn hàng xuất trong danh sách;
:Nhập Tên hàng, Mã hàng hóa, Số lượng, Đơn giá;
:Chọn đại lý để xuất hàng;
:nhập thông tin đại lý xuất hàng(Tên đại lý, Mã đại lý, Địa chỉ, SĐT);
:Kiểm tra tồn kho;
if (Số lượng đủ?) then (Có)
    :Tạo đơn xuất;
    :Cập nhật kho hàng;
    :Tạo hóa đơn xuất;
else (Không)
    :Thông báo hết hàng;
endif

stop

@enduml
`;

const encoded = plantumlEncoder.encode(umlCode);
const umlUrl = `http://www.plantuml.com/plantuml/svg/${encoded}`;

// Import font Montserrat from Google Fonts
const montserrat = Inter({ subsets: ['latin'] }); //import font chữ

// Home page component
export default function Home() {
    const [showSecondComponent, setShowSecondComponent] = useState(true); //khai báo trạng thái sử dụng cho accs sự kiện
    const [searchTerm, setSearchTerm] = useState(''); //khai báo trạng thái sử dụng cho accs sự kiện
    const [showUMLDiagram, setShowUMLDiagram] = useState(false); // Trạng thái để hiển thị sơ đồ UML

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowUMLDiagram(true); // Hiển thị sơ đồ UML sau 1 giây
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleHideUMLClick = () => {
        setShowUMLDiagram(false); // Ẩn sơ đồ UML khi bấm vào nút "Hide UML"
    };

    return (
        <main className="h-screen overflow-auto relative"> {/* Set height for the parent element */}
            <VideoComponent />

            {showSecondComponent && (
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
            )}

            {showSecondComponent && (
                <motion.div
                    initial={{ y: "-100vw" }}
                    animate={{ y: 0 }}
                    transition={{ type: "tween", duration: 1.5 }}
                    className="relative z-10"
                >
                    <Nav_bar />
                </motion.div>
            )}
            {showUMLDiagram && (
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
                            Lược đồ hoạt động
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

                        {showUMLDiagram && (
                            <motion.div
                                variants={animationVariants}
                                className="p-4 rounded-md shadow-md mt-4 flex flex-col items-center overflow-hidden"
                                style={{ maxHeight: '300vh' }}
                            >
                                <img src={umlUrl} alt="UML Diagram" className="max-w-full h-auto mb-4" />
                                <Link href="/">
                                    <button
                                        className="bg-white rounded-xl w-40 h-10 text-blue-800 font-semibold mt-4 flex items-center justify-center shadow-xl hover:bg-blue-800 hover:text-white"
                                        onClick={handleHideUMLClick}
                                    >
                                        Hide UML
                                    </button>
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </main>
    );
}
