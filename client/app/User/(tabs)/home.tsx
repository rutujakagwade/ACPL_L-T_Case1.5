// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { Link, useRouter } from "expo-router";
// import { useFocusEffect } from "@react-navigation/native";
// import { saveCheckpoint } from "../../../lib/session";

// const UserDashboard = () => {
//   const router = useRouter();

//   // Save checkpoint when screen is focused
//   useFocusEffect(
//     React.useCallback(() => {
//       saveCheckpoint("/User/(tabs)/home");
//     }, [])
//   );

//   // State for filter dropdown
//   const [filterVisible, setFilterVisible] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState("None");

//   return (
//     <ScrollView className="flex-1 bg-white relative">
//       {/* Header */}
//       <View className="bg-yellow-400 p-5 rounded-b-xl h-52">
//         {/* Top Row */}
//         <View className="flex-row justify-between items-center pt-16">
//           <Text className="text-2xl font-bold text-black">Welcome User!</Text>

//           {/* Filter Icon Button */}
//           <TouchableOpacity onPress={() => setFilterVisible(!filterVisible)}>
//             <Ionicons name="filter" size={22} color="black" />
//           </TouchableOpacity>
//         </View>

//         {/* Filter Dropdown */}
//         {filterVisible && (
//           <View
//             style={{
//               position: "absolute",
//               top: 65,
//               right: 15,
//               backgroundColor: "white",
//               paddingVertical: 6,
//               paddingHorizontal: 10,
//               borderRadius: 8,
//               elevation: 8, // Android shadow
//               shadowColor: "#000", // iOS shadow
//               shadowOpacity: 0.3,
//               shadowRadius: 4,
//               zIndex: 3,
//             }}
//           >
//             {["Within Variance", "This Month", "Today"].map((option) => (
//               <TouchableOpacity
//                 key={option}
//                 onPress={() => {
//                   setSelectedFilter(option);
//                   setFilterVisible(false);
//                 }}
//                 style={{ paddingVertical: 8 }}
//               >
//                 <Text style={{ fontSize: 15 }}>{option}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}
//       </View>

//       {/* Selected Filter Display */}
//       {selectedFilter !== "None" && (
//         <Text
//           style={{
//             paddingHorizontal: 20,
//             paddingTop: 10,
//             fontStyle: "italic",
//             color: "gray",
//           }}
//         >
//           Filter: {selectedFilter}
//         </Text>
//       )}

//       {/* Stats Section */}
//       <View className="p-4">
//         <View className="flex-row flex-wrap justify-between">
//           {/* Card 1 */}
//           <View className="w-[48%] bg-white rounded-2xl p-6 mb-4 shadow-md">
//             <Text className="text-2xl font-bold text-gray-900">2500</Text>
//             <View className="flex-row items-center mt-1">
//               <Ionicons name="arrow-up-outline" size={16} color="green" />
//               <Text className="text-xs text-gray-500 ml-1">Expected Amount</Text>
//             </View>
//           </View>

//           {/* Card 2 */}
//           <View className="w-[48%] bg-white rounded-2xl p-6 mb-4 shadow-md">
//             <Text className="text-2xl font-bold text-gray-900">1226</Text>
//             <View className="flex-row items-center mt-1">
//               <Ionicons name="arrow-up-outline" size={16} color="green" />
//               <Text className="text-xs text-gray-500 ml-1">Distance</Text>
//             </View>
//           </View>

//           {/* Card 3 */}
//           <View className="w-[48%] bg-white rounded-2xl p-6 mb-4 shadow-md">
//             <Text className="text-2xl font-bold text-gray-900">09</Text>
//             <View className="flex-row items-center mt-1">
//               <Ionicons name="arrow-up-outline" size={16} color="green" />
//               <Text className="text-xs text-gray-500 ml-1">Hours Spent</Text>
//             </View>
//           </View>

//           {/* Card 4 */}
//           <View className="w-[48%] bg-white rounded-2xl p-6 mb-4 shadow-md">
//             <Text className="text-2xl font-bold text-gray-900">11</Text>
//             <View className="flex-row items-center mt-1">
//               <Ionicons name="arrow-down-outline" size={16} color="red" />
//               <Text className="text-xs text-gray-500 ml-1">Journeys</Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* Quick Actions */}
//       <View className="px-4">
//         <Text className="font-bold text-base mb-3">Quick Actions</Text>
//         <View className="flex-row justify-between">
//           <TouchableOpacity
//             className="w-[48%] bg-yellow-300 py-4 rounded-2xl shadow-md items-center"
//             onPress={() => router.push("/User/newjourney")}
//           >
//             <Ionicons name="car-outline" size={24} color="black" />
//             <Text className="mt-1 font-medium">New Journey</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             className="w-[48%] bg-yellow-300 py-4 rounded-2xl shadow-md items-center"
//             onPress={() => router.push("/User/ExpenseForm")}
//           >
//             <Ionicons name="cash-outline" size={22} color="black" />
//             <Text className="mt-1 font-medium">Add Expense</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Recent Activity */}
//       <View className="px-4 mt-6">
//         <Text className="font-bold text-base mb-3">Recent Activity</Text>

//         <View className="flex-row justify-between items-center bg-white p-4 rounded-xl shadow mb-2">
//           <View>
//             <Text className="text-sm">Expense For Rs. 300</Text>
//             <Text className="text-xs text-gray-500">1 hour ago</Text>
//           </View>
//           <Text className="text-green-600 font-semibold">Approved</Text>
//         </View>

//         <View className="flex-row justify-between items-center bg-white p-4 rounded-xl shadow mb-2">
//           <View>
//             <Text className="text-sm">Expense For Rs. 500</Text>
//             <Text className="text-xs text-gray-500">2 hours ago</Text>
//           </View>
//           <Text className="text-red-600 font-semibold">Rejected</Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default UserDashboard;
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMyExpenses } from "@/lib/api";
import { useRouter } from "expo-router";

interface Expense {
  _id: string;
  amount: number;
  status: string;
  createdAt: string;
}

export default function Home() {
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([]);
  const router = useRouter();

  // Fetch recent expenses
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token =
          (await AsyncStorage.getItem("userToken")) ||
          (await AsyncStorage.getItem("adminToken"));
        if (!token) return console.log("No token found");

        const res = await getMyExpenses(token);
        console.log("Fetched expenses response:", res);

        // ✅ Safely extract expenses array
        const data = Array.isArray(res?.expenses)
          ? res.expenses
          : Array.isArray(res?.data?.expenses)
          ? res.data.expenses
          : [];

        // Sort by latest and take top 2
        const sorted = [...data].sort(
          (a: Expense, b: Expense) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setRecentExpenses(sorted.slice(0, 2));
      } catch (err) {
        console.error("Error fetching recent expenses:", err);
      }
    };

    fetchExpenses();
  }, []);

  // ✅ Fixed template literal syntax
  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const diff = Math.floor(
      (now.getTime() - new Date(dateString).getTime()) / 1000
    );
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hour ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  return (
    <ScrollView className="flex-1 bg-white relative">
      {/* Header */}
      <View className="bg-yellow-400 p-5 rounded-b-xl h-52">
        {/* Top Row */}
        <View className="flex-row justify-between items-center pt-16">
          {/* Profile Icon (Top Left) */}
          <View className="flex-row items-center">
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
              }}
              style={{ width: 35, height: 35, borderRadius: 50 }}
            />
            <Text className="text-2xl font-bold text-black ml-2">
              Welcome User!
            </Text>
          </View>

          {/* Filter Icon Button */}
          <TouchableOpacity>
            <Ionicons name="filter" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Section */}
      <View className="p-4">
        <View className="flex-row flex-wrap justify-between">
          <View className="w-[48%] bg-white rounded-2xl p-6 mb-4 shadow-md">
            <Text className="text-2xl font-bold text-gray-900">2500</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="arrow-up-outline" size={16} color="green" />
              <Text className="text-xs text-gray-500 ml-1">Expected Amount</Text>
            </View>
          </View>

          <View className="w-[48%] bg-white rounded-2xl p-6 mb-4 shadow-md">
            <Text className="text-2xl font-bold text-gray-900">1226</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="arrow-up-outline" size={16} color="green" />
              <Text className="text-xs text-gray-500 ml-1">Distance</Text>
            </View>
          </View>

          <View className="w-[48%] bg-white rounded-2xl p-6 mb-4 shadow-md">
            <Text className="text-2xl font-bold text-gray-900">09</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="arrow-up-outline" size={16} color="green" />
              <Text className="text-xs text-gray-500 ml-1">Hours Spent</Text>
            </View>
          </View>

          <View className="w-[48%] bg-white rounded-2xl p-6 mb-4 shadow-md">
            <Text className="text-2xl font-bold text-gray-900">11</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="arrow-down-outline" size={16} color="red" />
              <Text className="text-xs text-gray-500 ml-1">Journeys</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="px-4">
        <Text className="font-bold text-base mb-3">Quick Actions</Text>
        <View className="flex-row justify-between">
          <TouchableOpacity
            className="w-[48%] bg-yellow-300 py-4 rounded-2xl shadow-md items-center"
            onPress={() => router.push("/User/newjourney")}
          >
            <Ionicons name="car-outline" size={24} color="black" />
            <Text className="mt-1 font-medium">New Journey</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-[48%] bg-yellow-300 py-4 rounded-2xl shadow-md items-center"
            onPress={() => router.push("/User/ExpenseForm")}
          >
            <Ionicons name="cash-outline" size={22} color="black" />
            <Text className="mt-1 font-medium">Add Expense</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      <View className="px-4 mt-6 mb-6">
        <Text className="font-bold text-base mb-3">Recent Activity</Text>

        {recentExpenses.length === 0 ? (
          <Text className="text-gray-500 text-center">
            No recent expenses found
          </Text>
        ) : (
          recentExpenses.map((expense) => (
            <View
              key={expense._id}
              className="flex-row justify-between items-center bg-white p-4 rounded-xl shadow mb-2"
            >
              <View>
                <Text className="text-sm text-black font-medium">
                  Expense For Rs. {expense.amount}
                </Text>
                <Text className="text-xs text-gray-500">
                  {getTimeAgo(expense.createdAt)}
                </Text>
              </View>
              <Text
                className={`text-sm font-semibold ${
                  expense.status === "approved"
                    ? "text-green-600"
                    : expense.status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {expense.status
                  ? expense.status.charAt(0).toUpperCase() +
                    expense.status.slice(1)
                  : "Pending"}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
