'use client';

import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function ProgressPage() {
  // サンプルデータ
  const subjectProgress = [
    { subject: '数学', completed: 8, remaining: 12, total: 20 },
    { subject: '国語', completed: 12, remaining: 8, total: 20 },
    { subject: '理科', completed: 5, remaining: 10, total: 15 },
    { subject: '社会', completed: 6, remaining: 9, total: 15 },
  ];

  const overallProgress = [
    { name: '完了', value: 31, color: '#3b82f6' },
    { name: '未完了', value: 39, color: '#d1d5db' },
  ];

  const monthlyProgress = [
    { month: '4月', planned: 5, actual: 4 },
    { month: '5月', planned: 8, actual: 7 },
    { month: '6月', planned: 10, actual: 9 },
    { month: '7月', planned: 8, actual: 8 },
    { month: '8月', planned: 0, actual: 0 },
    { month: '9月', planned: 7, actual: 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800 mr-4">
              ← ホーム
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">進捗確認</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">

          {/* 全体進捗サマリー */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">総単元数</h3>
              <p className="text-3xl font-bold text-gray-900">70</p>
              <p className="text-sm text-gray-600 mt-1">全教科合計</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">完了単元</h3>
              <p className="text-3xl font-bold text-blue-600">31</p>
              <p className="text-sm text-gray-600 mt-1">44.3% 完了</p>
            </div>
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">残り単元</h3>
              <p className="text-3xl font-bold text-orange-600">39</p>
              <p className="text-sm text-gray-600 mt-1">55.7% 未完了</p>
            </div>
          </div>

          {/* グラフセクション */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

            {/* 教科別進捗グラフ */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">教科別進捗状況</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={subjectProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" name="完了" fill="#3b82f6" />
                  <Bar dataKey="remaining" name="未完了" fill="#d1d5db" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 全体進捗円グラフ */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">全体進捗率</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={overallProgress}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {overallProgress.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 月別進捗グラフ */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">月別進捗（予定 vs 実績）</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="planned" name="予定" fill="#93c5fd" />
                <Bar dataKey="actual" name="実績" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 教科詳細テーブル */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">教科別詳細</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      教科
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      完了単元
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      総単元数
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      進捗率
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subjectProgress.map((subject, idx) => {
                    const progress = Math.round((subject.completed / subject.total) * 100);
                    return (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {subject.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {subject.completed}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {subject.total}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-2" style={{ minWidth: '100px' }}>
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-700 font-medium">{progress}%</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
