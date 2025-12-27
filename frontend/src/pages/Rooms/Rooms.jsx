import React, { useState, useEffect } from "react";
import { cities } from "@/utils/constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import RoomCard from "./RoomCard";
import axios from "axios";
import useGetAllRooms from "@/hooks/useGetAllRooms";
import { useSelector } from "react-redux";

const Rooms = () => {
  useGetAllRooms();
  const rooms = useSelector((state) => state.rooms.allRooms);
  console.log(rooms);

  const [tempFilters, setTempFilters] = useState({
    city: "",
    priceRange: "",
    amenities: [],
  });

  const [appliedFilters, setAppliedFilters] = useState({
    city: "",
    priceRange: "",
    amenities: [],
  });
  const toggleAmenity = (amenity) => {
    setTempFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const applyFilter = (rooms) => {
    return rooms.filter((room) => {
      if (appliedFilters.city && room.address.city !== appliedFilters.city) {
        return false;
      }
      if (appliedFilters.priceRange) {
        const price = Number(room.price);
        if (appliedFilters.priceRange === "0-5000" && price > 5000)
          return false;
        if (
          appliedFilters.priceRange === "5000-10000" &&
          (price < 5000 || price > 10000)
        )
          return false;
        if (appliedFilters.priceRange === "10000+" && price < 10000)
          return false;
      }
      if (appliedFilters.amenities.length > 0) {
        const roomAmenities = Array.isArray(room.amenities)
          ? room.amenities
          : [];

        if (!appliedFilters.amenities.every((a) => roomAmenities.includes(a))) {
          return false;
        }
      }

      console.log(appliedFilters);
      return true;
    });
  };
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="mt-24 max-w-7xl mx-auto px-4 mb-20 lg:grid lg:grid-cols-12 lg:gap-6 items-start">
      <aside className="hidden lg:block col-span-3 sticky top-24 h-fit">
        <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-bold text-slate-800">Filter Rooms</h2>

          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Location
            </h3>
            <Select
              value={tempFilters.city}
              onValueChange={(value) =>
                setTempFilters((prev) => ({ ...prev, city: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cities</SelectLabel>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Price Range
            </h3>
            <RadioGroup
              className="space-y-2"
              value={tempFilters.priceRange}
              onValueChange={(value) =>
                setTempFilters((prev) => ({ ...prev, priceRange: value }))
              }
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="0-5000" id="p1" />
                <Label htmlFor="p1">₹0 - ₹5,000</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="5000-10000" id="p2" />
                <Label htmlFor="p2">₹5,000 - ₹10,000</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="10000+" id="p3" />
                <Label htmlFor="p3">₹10,000+</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Amenities
            </h3>
            <div className="space-y-2">
              {["WiFi", "Parking", "AC", "Geyser"].map((amenity) => (
                <div key={amenity} className="flex items-center gap-2">
                  <Checkbox
                    id={amenity}
                    checked={tempFilters.amenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <Label htmlFor={amenity}>{amenity}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <button
              className="w-full bg-primary text-white rounded-xl px-4 py-3 font-semibold hover:bg-primary/90 transition"
              onClick={() => setAppliedFilters(tempFilters)}
            >
              Apply Filters
            </button>
            <button
              className="w-full bg-slate-100 text-slate-700 rounded-xl px-4 py-3 font-semibold hover:bg-slate-200 transition"
              onClick={() => {
                setAppliedFilters({
                  city: "",
                  priceRange: "",
                  amenities: [],
                });
                setTempFilters({ city: "", priceRange: "", amenities: [] });
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      </aside>

      <main className="lg:col-span-9">
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilter(true)}
            className="w-full bg-white border rounded-xl px-4 py-3 shadow-sm font-semibold text-slate-700"
          >
            Filters
          </button>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
          Available Rooms
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {applyFilter(rooms).length === 0 ? (
            <p className="text-slate-500 col-span-full text-center">
              No rooms match your filters
            </p>
          ) : (
            applyFilter(rooms).map((room) => (
              <RoomCard key={room._id} {...room} />
            ))
          )}
        </div>
      </main>

      {showFilter && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end lg:hidden">
          <div className="w-full bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-800">Filter Rooms</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="text-slate-500 font-semibold"
              >
                Close
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  Location
                </h3>
                <Select
                  value={tempFilters.city}
                  onValueChange={(value) =>
                    setTempFilters((prev) => ({ ...prev, city: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Cities</SelectLabel>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  Price Range
                </h3>
                <RadioGroup className="space-y-2">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="0-5000" id="m1" />
                    <Label htmlFor="m1">₹0 - ₹5,000</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="5000-10000" id="m2" />
                    <Label htmlFor="m2">₹5,000 - ₹10,000</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="10000+" id="m3" />
                    <Label htmlFor="m3">₹10,000+</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  Amenities
                </h3>
                <div className="space-y-2">
                  {["WiFi", "Parking", "AC", "Geyser"].map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <Checkbox id={`m-${amenity}`} />
                      <Label htmlFor={`m-${amenity}`}>{amenity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setAppliedFilters(tempFilters);
                    setShowFilter(false);
                  }}
                  className="w-full bg-primary text-white rounded-xl px-4 py-3 font-semibold"
                >
                  Apply Filters
                </button>
                <button
                  className="w-full bg-slate-100 text-slate-700 rounded-xl px-4 py-3 font-semibold"
                  onClick={() =>
                    setTempFilters({ city: "", priceRange: "", amenities: [] })
                  }
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
