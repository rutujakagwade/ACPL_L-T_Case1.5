// // app/Admin/MemberProfile.tsx
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   Modal,
// } from "react-native";
// import { useLocalSearchParams, useRouter } from "expo-router";
// import { getMemberProfile, addBalance } from "../../lib/api";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from "@expo/vector-icons";

// type Member = {
//   _id: string;
//   name: string;
//   email: string;
//   status: string;
//   role?: string;
//   balance?: number;
// };

// export default function MemberProfile() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();

//   const [member, setMember] = useState<Member | null>(null);
//   const [balance, setBalance] = useState<number>(0);
//   const [amount, setAmount] = useState<string>("");
//   const [loading, setLoading] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);

//   // Fetch member profile on mount or id change
//   useEffect(() => {
//     const fetchData = async () => {
//       console.log("🔄 fetchData triggered, id:", id);
//       if (!id) return;

//       try {
//         // Get role and token from AsyncStorage
//         const role = await AsyncStorage.getItem("role");
//         const token =
//           role === "admin"
//             ? await AsyncStorage.getItem("adminToken")
//             : await AsyncStorage.getItem("userToken");

//         console.log("🚀 Role from AsyncStorage:", role);
//         console.log("🚀 Token from AsyncStorage:", token);

//         if (!token) {
//           Alert.alert("Error", "Token missing or expired");
//           return;
//         }

//         // Fetch member data from backend
//         const memberData: Member = await getMemberProfile(id, token);
//         console.log("✅ Member data received:", memberData);

//         setMember(memberData);
//         setBalance(memberData.balance ?? 0);
//       } catch (err: any) {
//         console.error("❌ Failed to fetch member profile:", err);
//         Alert.alert("Error", err.message || "Failed to fetch member profile");
//       }
//     };

//     fetchData();
//   }, [id]);

//   // Add balance
//   const handleAddBalance = async () => {
//     if (!amount) return Alert.alert("Error", "Enter an amount");

//     try {
//       setLoading(true);

//       const role = await AsyncStorage.getItem("role");
//       const token =
//         role === "admin"
//           ? await AsyncStorage.getItem("adminToken")
//           : await AsyncStorage.getItem("userToken");

//       if (!token) return Alert.alert("Error", "Token missing");

//       const res = await addBalance(id!, Number(amount), token);

//       if (res.balanceAmount !== undefined) {
//         setBalance(res.balanceAmount);
//         Alert.alert("✅ Success", `Balance updated: Rs. ${res.balanceAmount}`);
//         if (member) setMember({ ...member, balance: res.balanceAmount });
//       } else {
//         Alert.alert("❌ Error", res.message || "Failed to update balance");
//       }

//       setAmount("");
//       setModalVisible(false);
//     } catch (err) {
//       console.error("❌ addBalance error:", err);
//       Alert.alert("❌ Error", "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!member)
//     return (
//       <View className="flex-1 justify-center items-center">
//         <Text>Loading member profile...</Text>
//       </View>
//     );

//   return (
//     <ScrollView className="flex-1 bg-white ">
//       {/* Header */}

//       <View className="flex-row items-center pt-16 bg-yellow-300 py-4 px-3 rounded-b-xl">
//         <TouchableOpacity onPress={() => router.back()} className="mr-3">
//           <Ionicons name="arrow-back" size={20} color="black" />
//           <Text className="text-2xl p-3 font-bold">{member.name}</Text>
//         </TouchableOpacity>

//       </View>
//       <View >
//          <View className="pt-5 p-5">
          
//           <Text className="text-gray-600">{member.email}</Text>
//           <Text
//             className={`font-semibold ${
//               member.status === "active"
//                 ? "text-green-600"
//                 : member.status === "pending"
//                 ? "text-orange-600"
//                 : "text-red-600"
//             } capitalize`}
//           >
//             {member.status}
//           </Text>
//         </View>
//       </View>

//       {/* Balance + Add */}
//       <View className="flex-row justify-between mx-4 mt-4">
//         <View className="flex-1 bg-white rounded-lg shadow p-3 mr-2">
//           <Text className="text-gray-600">Current Balance:</Text>
//           <Text className="font-bold mt-1">Rs. {balance}</Text>
//         </View>
//         <TouchableOpacity
//           onPress={() => setModalVisible(true)}
//           className="bg-yellow-300 rounded-lg px-5 justify-center items-center"
//         >
//           <Text className="font-semibold">+ Add Balance</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Modal */}
//       <Modal animationType="fade" transparent visible={modalVisible}>
//         <View className="flex-1 justify-center items-center bg-black/50">
//           <View className="bg-white rounded-xl w-4/5 p-6 shadow-lg">
//             <Text className="text-lg font-bold mb-4 text-center">Enter Amount</Text>
//             <TextInput
//               placeholder="Enter amount"
//               value={amount}
//               onChangeText={setAmount}
//               keyboardType="numeric"
//               className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
//             />
//             <View className="flex-row justify-between">
//               <TouchableOpacity
//                 onPress={() => setModalVisible(false)}
//                 className="bg-gray-300 rounded-lg px-4 py-2"
//               >
//                 <Text className="font-semibold">Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 onPress={handleAddBalance}
//                 disabled={loading}
//                 className="bg-yellow-300 rounded-lg px-4 py-2"
//               >
//                 <Text className="font-semibold">{loading ? "..." : "Add"}</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// }


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getMemberProfile, addBalance } from "../../lib/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

type Member = {
  _id: string;
  name: string;
  email: string;
  status: string;
  role?: string;
  balance?: number;
};

type Journey = {
  _id: string;
  purpose?: string;
  startTime?: string;
  distance?: number;
  startLocation?: { name?: string } | string;
  endLocation?: { name?: string } | string;
  user?: string | { _id: string };
  totalExpense?: number;
  expenseType?: string;
  description?: string;
  receipts?: string[];
};

export default function MemberProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [member, setMember] = useState<Member | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [journeyLoading, setJourneyLoading] = useState(true);
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState<Journey | null>(null);

  // 🔹 Fetch member profile
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const role = await AsyncStorage.getItem("role");
        const token =
          role === "admin"
            ? await AsyncStorage.getItem("adminToken")
            : await AsyncStorage.getItem("userToken");

        if (!token) {
          Alert.alert("Error", "Token missing or expired");
          return;
        }

        const memberData: Member = await getMemberProfile(id, token);
        setMember(memberData);
        setBalance(memberData.balance ?? 0);
      } catch (err: any) {
        console.error("❌ Failed to fetch member profile:", err);
        Alert.alert("Error", err.message || "Failed to fetch member profile");
      }
    };

    fetchData();
  }, [id]);

  // 🔹 Fetch journeys for this member
  useEffect(() => {
    const fetchJourneys = async () => {
      if (!id) return;

      try {
        setJourneyLoading(true);
        const role = await AsyncStorage.getItem("role");
        const token =
          role === "admin"
            ? await AsyncStorage.getItem("adminToken")
            : await AsyncStorage.getItem("userToken");

        if (!token) {
          console.error("⚠️ No token found");
          return;
        }

        const res = await fetch(
          `http://192.168.1.7:5000/api/journeys/member/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const text = await res.text();
        console.log("📡 Raw journey response:", text);

        const data = JSON.parse(text);
        console.log("📦 Journeys for member:", JSON.stringify(data, null, 2));

        if (Array.isArray(data)) {
          setJourneys(data);
        } else {
          console.error("❌ Unexpected journey data:", data);
          setJourneys([]);
        }
      } catch (error) {
        console.error("❌ Error fetching journeys:", error);
      } finally {
        setJourneyLoading(false);
      }
    };

    fetchJourneys();
  }, [id]);

  // 🔹 Add balance handler
  const handleAddBalance = async () => {
    if (!amount) return Alert.alert("Error", "Enter an amount");

    try {
      setLoading(true);
      const role = await AsyncStorage.getItem("role");
      const token =
        role === "admin"
          ? await AsyncStorage.getItem("adminToken")
          : await AsyncStorage.getItem("userToken");

      if (!token) return Alert.alert("Error", "Token missing");

      const res = await addBalance(id!, Number(amount), token);

      if (res.balanceAmount !== undefined) {
        setBalance(res.balanceAmount);
        Alert.alert("✅ Success", `Balance updated: Rs. ${res.balanceAmount}`);
        if (member) setMember({ ...member, balance: res.balanceAmount });
      } else {
        Alert.alert("❌ Error", res.message || "Failed to update balance");
      }

      setAmount("");
      setModalVisible(false);
    } catch (err) {
      console.error("❌ addBalance error:", err);
      Alert.alert("❌ Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!member)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="black" />
        <Text>Loading member profile...</Text>
      </View>
    );

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-yellow-300 pb-14 rounded-b-3xl relative">
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-14 left-5 z-10"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View className="items-center mt-16">
          <View className="w-24 h-24 rounded-full bg-white border-4 border-yellow-300 items-center justify-center shadow">
            <Ionicons name="person" size={60} color="black" />
          </View>
        </View>
      </View>

      {/* Member Info */}
      <View className="items-center mt-4">
        <Text className="text-xl font-bold">{member.name}</Text>
        <Text className="text-gray-600">{member.email}</Text>
        <Text
          className={`font-semibold mt-1 capitalize ${
            member.status === "active"
              ? "text-green-600"
              : member.status === "pending"
              ? "text-orange-600"
              : "text-red-600"
          }`}
        >
          {member.status}
        </Text>
      </View>

      {/* Balance Section */}
      <View className="flex-row justify-between px-6 mt-6">
        <View className="flex-1 bg-white rounded-xl p-4 mr-2 shadow border border-gray-100 items-center">
          <Text className="text-gray-600 text-sm">Current Balance</Text>
          <Text className="text-lg font-bold mt-1">Rs. {balance}</Text>
        </View>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="flex-1 bg-yellow-300 rounded-xl p-4 ml-2 shadow border border-gray-200 items-center justify-center"
        >
          <Ionicons name="add" size={20} color="black" />
          <Text className="font-semibold mt-1 text-sm">Add Balance</Text>
        </TouchableOpacity>
      </View>

      {/* Journeys Section */}
      <View className="mt-8 px-5 mb-6">
        <Text className="text-lg font-bold mb-3">Journeys</Text>

        {journeyLoading ? (
          <ActivityIndicator size="large" color="black" />
        ) : journeys.length === 0 ? (
          <Text className="text-gray-500 text-center mt-4">
            No journeys found for this member.
          </Text>
        ) : (
          journeys.map((journey) => (
            <View
              key={journey._id}
              className="bg-white rounded-xl p-4 mb-4 shadow border border-gray-100"
            >
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-semibold text-base flex-1 mr-3">
                  {journey.purpose || "No Purpose"}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedJourney(journey);
                    setDetailModal(true);
                  }}
                  style={{
                    backgroundColor: "#222B37",
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    View Details
                  </Text>
                </TouchableOpacity>
              </View>

              <Text className="text-gray-500 text-sm">
                {journey.startTime
                  ? new Date(journey.startTime).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "No Date"}
              </Text>

              <Text className="text-gray-700 text-sm mt-1">
                {(journey.distance ?? 0).toFixed(2)} km
              </Text>

              <View className="mt-2">
                <View className="flex-row items-center">
                  <Ionicons name="location-outline" size={16} color="black" />
                  <Text className="ml-1 text-gray-600 text-sm">
                    {typeof journey.startLocation === "string"
                      ? journey.startLocation
                      : journey.startLocation?.name || "Start Location"}
                  </Text>
                </View>
                <View className="flex-row items-center mt-1">
                  <Ionicons name="location-outline" size={16} color="black" />
                  <Text className="ml-1 text-gray-600 text-sm">
                    {typeof journey.endLocation === "string"
                      ? journey.endLocation
                      : journey.endLocation?.name || "End Location"}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
      </View>

      {/* 🔹 Journey Details Modal */}
      <Modal
        visible={detailModal}
        animationType="slide"
        transparent
        onRequestClose={() => setDetailModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-4">
          <View className="bg-white rounded-2xl w-full p-5">
            <TouchableOpacity
              onPress={() => setDetailModal(false)}
              className="absolute top-3 right-3 z-10"
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>

            {selectedJourney ? (
              <>
                <Text className="text-lg font-bold mb-1">
                  {selectedJourney.purpose || "No Purpose"}
                </Text>
                <Text className="text-gray-500 text-sm mb-2">
                  {selectedJourney.startTime
                    ? new Date(selectedJourney.startTime).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )
                    : "No Date"}
                </Text>

                <Text className="text-gray-700 font-semibold">
                  {(selectedJourney.distance ?? 0).toFixed(2)} km
                </Text>

                <View className="mt-3">
                  <View className="flex-row items-center mb-1">
                    <Ionicons name="location-outline" size={16} color="black" />
                    <Text className="ml-2 text-gray-600">
                      {typeof selectedJourney.startLocation === "string"
                        ? selectedJourney.startLocation
                        : selectedJourney.startLocation?.name ||
                          "Start Location"}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="location-outline" size={16} color="black" />
                    <Text className="ml-2 text-gray-600">
                      {typeof selectedJourney.endLocation === "string"
                        ? selectedJourney.endLocation
                        : selectedJourney.endLocation?.name ||
                          "End Location"}
                    </Text>
                  </View>
                </View>

                <View className="mt-4 border-t border-gray-200 pt-3">
                  <Text className="text-gray-700 text-sm mb-1">
                    Total Expense:{" "}
                    <Text className="font-bold">
                      ₹{selectedJourney.totalExpense ?? "0"}
                    </Text>
                  </Text>
                  <Text className="text-gray-700 text-sm mb-1">
                    Expense Type:{" "}
                    <Text className="font-bold">
                      {selectedJourney.expenseType || "N/A"}
                    </Text>
                  </Text>
                  <Text className="text-gray-700 text-sm mb-1">
                    Description:{" "}
                    <Text className="font-bold">
                      {selectedJourney.description || "N/A"}
                    </Text>
                  </Text>
                  <Text className="text-gray-700 text-sm">
                    Receipts:{" "}
                    <Text className="font-bold">
                      {selectedJourney.receipts?.length
                        ? `${selectedJourney.receipts.length} uploaded`
                        : "None"}
                    </Text>
                  </Text>
                </View>
              </>
            ) : (
              <ActivityIndicator size="large" color="black" />
            )}
          </View>
        </View>
      </Modal>

      {/* Add Balance Modal */}
      <Modal animationType="fade" transparent visible={modalVisible}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl w-4/5 p-6 shadow-lg">
            <Text className="text-lg font-bold mb-4 text-center">
              Enter Amount
            </Text>
            <TextInput
              placeholder="Enter amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
            />
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="bg-gray-300 rounded-lg px-4 py-2"
              >
                <Text className="font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAddBalance}
                disabled={loading}
                className="bg-yellow-300 rounded-lg px-4 py-2"
              >
                <Text className="font-semibold">
                  {loading ? "..." : "Add"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
