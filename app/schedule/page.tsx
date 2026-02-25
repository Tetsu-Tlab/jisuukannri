'use client';

import Link from "next/link";
import { useState } from "react";

interface Lesson {
  id: string;
  date: string;
  period: number;
  subject: string;
  unit: string;
  memo: string;
}

export default function SchedulePage() {
  const [lessons, setLessons] = useState<Lesson[]>([
    { id: '1', date: '2026-02-20', period: 1, subject: '数学', unit: '単元1: 導入', memo: '順調に進んだ' },
    { id: '2', date: '2026-02-21', period: 2, subject: '数学', unit: '単元2: 基礎', memo: '' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newLesson, setNewLesson] = useState({
    date: new Date().toISOString().split('T')[0],
    period: 1,
    subject: '数学',
    unit: '',
    memo: '',
  });

  // 未実施の次の単元を提案
  const suggestedUnits = [
    '単元3: 応用',
    '単元4: 発展',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lesson: Lesson = {
      id: Date.now().toString(),
      ...newLesson,
    };
    setLessons([lesson, ...lessons]);
    setShowForm(false);
    setNewLesson({
      date: new Date().toISOString().split('T')[0],
      period: 1,
      subject: '数学',
      unit: '',
      memo: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800 mr-4">
              ← ホーム
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">時間割入力</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">

          {/* 追加ボタン */}
          <div className="mb-6">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showForm ? '閉じる' : '+ 授業記録を追加'}
            </button>
          </div>

          {/* 入力フォーム */}
          {showForm && (
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">新しい授業記録</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      日付
                    </label>
                    <input
                      type="date"
                      value={newLesson.date}
                      onChange={(e) => setNewLesson({ ...newLesson, date: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      時限
                    </label>
                    <select
                      value={newLesson.period}
                      onChange={(e) => setNewLesson({ ...newLesson, period: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      {[1, 2, 3, 4, 5, 6].map(p => (
                        <option key={p} value={p}>{p}時限</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    教科
                  </label>
                  <input
                    type="text"
                    value={newLesson.subject}
                    onChange={(e) => setNewLesson({ ...newLesson, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    単元（自動提案）
                  </label>
                  <input
                    type="text"
                    value={newLesson.unit}
                    onChange={(e) => setNewLesson({ ...newLesson, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="単元を入力またはクリックで選択"
                    required
                  />
                  <div className="mt-2 flex flex-wrap gap-2">
                    {suggestedUnits.map((unit, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNewLesson({ ...newLesson, unit })}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    メモ（任意）
                  </label>
                  <textarea
                    value={newLesson.memo}
                    onChange={(e) => setNewLesson({ ...newLesson, memo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    placeholder="授業の様子や気づきを記録"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    保存
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    キャンセル
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 授業記録リスト */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">授業記録履歴</h2>

            {lessons.length === 0 ? (
              <p className="text-gray-500 text-center py-8">まだ授業記録がありません</p>
            ) : (
              <div className="space-y-3">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium text-gray-500">
                            {new Date(lesson.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                            {lesson.period}時限
                          </span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            {lesson.subject}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{lesson.unit}</h3>
                        {lesson.memo && (
                          <p className="text-sm text-gray-600">{lesson.memo}</p>
                        )}
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
