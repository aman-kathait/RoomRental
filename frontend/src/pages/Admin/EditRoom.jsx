import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetRoomById from "@/hooks/useGetRoomById";
import { useSelector } from "react-redux";
import { clearRoomDetails, setRoomDetails } from "@/redux/slices/roomSlice";
import { useDispatch } from "react-redux";
import { updateRoom } from "@/services/roomService";
import { toast } from "react-toastify";
import { triggerRefreshRooms } from "@/redux/slices/roomSlice";
const EditRoom = ({ open, onOpenChange, roomId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const room = useSelector((state) => state.rooms.roomDetails);
  useGetRoomById(roomId);
  const [formData, setFormData] = useState({
    propertyName: "",
    description: "",
    price: "",
    amenties: [],
  });
  useEffect(() => {
    if (!room || !open) return;

    setFormData({
      propertyName: room.propertyName || "",
      description: room.description || "",
      price: room.price || "",
      addressLine1: room.address.addressLine1 || "",
      landmark: room.address.landmark || "",
      pincode: room.address.pincode || "",
    });
  }, [room, open]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        setLoading(true);
      const response = await updateRoom(roomId, formData);
      if (response.data.statusCode === 200) {
        toast.success("Room updated successfully 🎉");
        dispatch(clearRoomDetails());
        dispatch(triggerRefreshRooms());
        onOpenChange(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Room Details</DialogTitle>
              <DialogDescription>
                Make changes to your room here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 m-2">
              <div className="grid gap-3">
                <Label htmlFor="propertyName">Property Name</Label>
                <Input
                  id="propertyName"
                  name="propertyName"
                  value={formData.propertyName}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="landmark">Landmark</Label>
                <Input
                  id="landmark"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-3"></div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditRoom;
