'use client';

import Link from "next/link";
import { useState } from "react";

interface Unit {
  id: string;
  title: string;
  completed: boolean;
  estimatedHours: number;
}

export default function AnnualPlanPage() {
  const [units, setUnits] = useState<Unit[]>([
    { id: '1', title: '単元1: 導入', completed: true, estimatedHours: 4 },
    { id: '2', title: '単元2: 基礎', completed: true, estimatedHours: 6 },
    { id: '3', title: '単元3: 応用', completed: false, estimatedHours: 8 },
    { id: '4', title: '単元4: 発展', completed: false, estimatedHours: 6 },
  ]);

  const toggleUnit = (id: string) => {
    setUnits(units.map(unit =>
      unit.id === id ? { ...unit, completed: !unit.completed } : unit
    ));
  };

  const totalUnits = units.length;
  const completedUnits = units.filter(u => u.completed).length;
  const progressPercentage = Math.round((completedUnits / totalUnits) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800 mr-4">
              ← ホーム
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">年間計画管理</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">

          {/* 進捗サマリー */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">進捗状況</h2>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-600 h-4 rounded-full transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-lg font-semibold text-gray-700">
                {completedUnits} / {totalUnits} 単元完了 ({progressPercentage}%)
              </div>
            </div>
          </div>

          {/* インポート・アップロードセクション */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">年間計画のインポート</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.413V13H5.5z" />
                </svg>
                Googleスプレッドシートから読み込み
              </button>
              <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                PDFファイルをアップロード
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              ※現在はサンプルデータを表示しています。Supabaseセットアップ後に実際のデータを保存できます。
            </p>
          </div>

          {/* 単元リスト */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">単元一覧</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                + 単元を追加
              </button>
            </div>

            <div className="space-y-3">
              {units.map((unit) => (
                <div
                  key={unit.id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={unit.completed}
                    onChange={() => toggleUnit(unit.id)}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <h3 className={`font-medium ${unit.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                      {unit.title}
                    </h3>
                    <p className="text-sm text-gray-500">予定時間: {unit.estimatedHours}時間</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
