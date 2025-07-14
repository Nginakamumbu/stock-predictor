"use client"

import { useState } from "react"
import { Search, TrendingUp, TrendingDown, BarChart3, Calendar, Clock, Zap, Target, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function StockForexPredictionApp() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTimeframe, setSelectedTimeframe] = useState("1d")

  const mockPredictions = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      currentPrice: 175.43,
      predictedPrice: 182.5,
      change: 7.07,
      changePercent: 4.03,
      confidence: 87,
      trend: "up",
      category: "tech",
    },
    {
      symbol: "EUR/USD",
      name: "Euro to US Dollar",
      currentPrice: 1.0845,
      predictedPrice: 1.092,
      change: 0.0075,
      changePercent: 0.69,
      confidence: 72,
      trend: "up",
      category: "forex",
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      currentPrice: 248.5,
      predictedPrice: 235.2,
      change: -13.3,
      changePercent: -5.35,
      confidence: 79,
      trend: "down",
      category: "tech",
    },
  ]

  const topMovers = [
    { symbol: "NVDA", change: 8.45, changePercent: 12.3, trend: "up" },
    { symbol: "GBP/USD", change: 0.0123, changePercent: 0.98, trend: "up" },
    { symbol: "AMZN", change: -4.2, changePercent: -2.8, trend: "down" },
    { symbol: "USD/JPY", change: -0.85, changePercent: -0.57, trend: "down" },
  ]
  

  const getCardGradient = (category, trend) => {
    if (category === "tech") {
      return trend === "up"
        ? "bg-gradient-to-br from-indigo-400 via-pink-400 to-red-400"
        : "bg-gradient-to-br from-red-400 via-orange-400 to-yellow-400"
    } else if (category === "forex") {
      return trend === "up"
        ? "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500"
        : "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500"
    }
    return "bg-gradient-to-br from-blue-500 via-indigo-400 to-pink-400"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-indigo-800 to-pink-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-lg border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-200">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Stock & Forex Predictions
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-lg animate-pulse">
                <Clock className="h-3 w-3 mr-1" />
                Live Data
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <Card className="bg-black/20 backdrop-blur-lg border-white/20 shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-white">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg">
                  <Search className="h-5 w-5 text-white" />
                </div>
                <span>Get AI Predictions</span>
                <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
              </CardTitle>
              <CardDescription className="text-gray-300">
                Enter a stock symbol (e.g., AAPL) or forex pair (e.g., EUR/USD) to get AI-powered predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter symbol (AAPL, EUR/USD, BTC/USD...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-lg bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50"
                  />
                </div>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-full sm:w-48 bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="1h">1 Hour</SelectItem>
                    <SelectItem value="1d">1 Day</SelectItem>
                    <SelectItem value="1w">1 Week</SelectItem>
                    <SelectItem value="1m">1 Month</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg transform hover:scale-105 transition-all duration-200">
                  <Search className="h-4 w-4 mr-2" />
                  Predict
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Predictions */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="predictions" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-black/20 backdrop-blur-lg border-white/20">
                <TabsTrigger
                  value="predictions"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-400 data-[state=active]:to-pink-400 text-white"
                >
                  AI Predictions
                </TabsTrigger>
                <TabsTrigger
                  value="analysis"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 text-white"
                >
                  Market Analysis
                </TabsTrigger>
              </TabsList>

              <TabsContent value="predictions" className="space-y-4">
                {mockPredictions.map((prediction, index) => (
                  <Card
                    key={prediction.symbol}
                    className="bg-black/20 backdrop-blur-lg border-white/20 shadow-2xl hover:shadow-indigo-500/25 transition-all duration-300 transform hover:scale-[1.02] group"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white flex items-center space-x-2">
                            <span>{prediction.symbol}</span>
                            <div
                              className={`w-3 h-3 rounded-full ${getCardGradient(prediction.category, prediction.trend)} animate-pulse`}
                            ></div>
                          </h3>
                          <p className="text-gray-300">{prediction.name}</p>
                        </div>
                        <Badge
                          className={`${getCardGradient(prediction.category, prediction.trend)} text-white border-0 shadow-lg group-hover:animate-pulse`}
                        >
                          <Target className="h-3 w-3 mr-1" />
                          {prediction.confidence}% Confidence
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                          <p className="text-sm text-gray-400">Current Price</p>
                          <p className="text-lg font-semibold text-white">${prediction.currentPrice}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                          <p className="text-sm text-gray-400">Predicted Price</p>
                          <p className="text-lg font-semibold text-white">${prediction.predictedPrice}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                          <p className="text-sm text-gray-400">Change</p>
                          <div className="flex items-center space-x-1">
                            {prediction.trend === "up" ? (
                              <TrendingUp className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-400" />
                            )}
                            <span
                              className={`font-semibold ${prediction.trend === "up" ? "text-emerald-400" : "text-red-400"}`}
                            >
                              ${Math.abs(prediction.change).toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
                          <p className="text-sm text-gray-400">Change %</p>
                          <span
                            className={`font-semibold ${prediction.trend === "up" ? "text-emerald-400" : "text-red-400"}`}
                          >
                            {prediction.changePercent > 0 ? "+" : ""}
                            {prediction.changePercent}%
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="analysis">
                <Card className="bg-black/20 backdrop-blur-lg border-white/20 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Activity className="h-5 w-5 text-cyan-400" />
                      <span>Market Analysis</span>
                    </CardTitle>
                    <CardDescription className="text-gray-300">AI-powered insights and market trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg border border-emerald-500/30 hover:border-emerald-400/50 transition-colors">
                        <h4 className="font-semibold text-emerald-400 mb-2 flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4" />
                          <span>Market Sentiment: Bullish</span>
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Current market conditions show positive momentum with strong buying pressure across major
                          indices.
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30 hover:border-yellow-400/50 transition-colors">
                        <h4 className="font-semibold text-yellow-400 mb-2 flex items-center space-x-2">
                          <Zap className="h-4 w-4" />
                          <span>Risk Assessment: Moderate</span>
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Volatility levels are within normal ranges, but monitor upcoming economic indicators.
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-lg border border-indigo-400/30 hover:border-indigo-300/50 transition-colors">
                        <h4 className="font-semibold text-indigo-300 mb-2 flex items-center space-x-2">
                          <Target className="h-4 w-4" />
                          <span>Recommendation: Hold/Buy</span>
                        </h4>
                        <p className="text-gray-300 text-sm">
                          Technical indicators suggest continued upward momentum for selected positions.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Movers */}
            <Card className="bg-black/20 backdrop-blur-lg border-white/20 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <div className="bg-gradient-to-r from-pink-400 to-rose-400 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <span>Top Movers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topMovers.map((mover, index) => (
                    <div
                      key={mover.symbol}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${mover.trend === "up" ? "bg-emerald-400" : "bg-red-400"} animate-pulse`}
                        ></div>
                        <span className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                          {mover.symbol}
                        </span>
                      </div>
                      <div className="text-right">
                        <div
                          className={`font-semibold ${mover.changePercent > 0 ? "text-emerald-400" : "text-red-400"}`}
                        >
                          {mover.changePercent > 0 ? "+" : ""}
                          {mover.changePercent}%
                        </div>
                        <div className="text-sm text-gray-400">
                          {mover.changePercent > 0 ? "+" : ""}
                          {mover.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-black/20 backdrop-blur-lg border-white/20 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <span>Market Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "S&P 500", change: "+0.85%", positive: true },
                    { name: "NASDAQ", change: "+1.24%", positive: true },
                    { name: "DOW", change: "-0.32%", positive: false },
                    { name: "VIX", change: "16.42", neutral: true },
                  ].map((stat, index) => (
                    <div
                      key={stat.name}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                    >
                      <span className="text-gray-300 group-hover:text-white transition-colors">{stat.name}</span>
                      <span
                        className={`font-semibold ${
                          stat.neutral ? "text-white" : stat.positive ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Last Updated */}
            <Card className="bg-black/20 backdrop-blur-lg border-white/20 shadow-2xl">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Calendar className="h-4 w-4 text-cyan-400" />
                  <span>Last updated: {new Date().toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
  
}
