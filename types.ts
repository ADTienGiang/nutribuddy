import React from 'react';

export type Page = 'home' | 'recognize' | 'suggest' | 'recipe' | 'bot' | 'journey' | 'green' | 'settings';
export type Language = 'vi' | 'en' | 'ja' | 'zh';

export interface Nutrient {
  ten: string;
  giaTri: string;
  donVi: string;
  icon: 'CALORIES' | 'PROTEIN' | 'FAT' | 'CARBS' | 'VITAMINS' | 'MINERALS';
}

export interface RecognizedFood {
  tenMonAn: string;
  moTa: string;
  danhMuc: 'Rau củ' | 'Trái cây' | 'Tinh bột' | 'Đạm' | 'Chất béo' | 'Đồ ngọt' | 'Khác';
  dinhDuong: Nutrient[];
}

export interface UserProfile {
  tuoi: number;
  gioiTinh: 'male' | 'female';
  chieuCao: number;
  canNang: number;
  mucTieu: 'duy_tri' | 'tang_can' | 'giam_can';
  tinhTrangSucKhoe: string;
}

export interface Meal {
  tenBua: 'Bữa Sáng' | 'Bữa Trưa' | 'Bữa Tối' | 'Bữa Phụ';
  monAn: string;
  lyDo: string;
}

export interface MealPlan {
  buaAn: Meal[];
}

export interface Recipe {
  tenMon: string;
  moTa: string;
  nguyenLieu: string[];
  buocLam: string[];
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export interface Badge {
  id: 'water' | 'veggie' | 'chef';
  name: string;
  description: string;
  earned: boolean;
  // FIX: Added React import to resolve React.ComponentType
  icon: React.ComponentType<{ className?: string }>;
}

export interface GreenFood {
  tenThucPham: string;
  moTa: string;
  lyDoThanThien: string;
  emoji: string;
}

export type MealTypeKey = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FoodLogEntry {
  id: string;
  date: string; // YYYY-MM-DD
  mealType: MealTypeKey;
  foodName: string;
  calories: number;
}

export interface WeightEntry {
  date: string; // YYYY-MM-DD
  weight: number;
}