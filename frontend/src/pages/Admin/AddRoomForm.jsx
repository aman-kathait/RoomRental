import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldDescription,
} from "@/components/ui/field";
import { UploadCloud, X } from "lucide-react";
import { toast } from "react-toastify";
import { addRoom } from "@/services/roomService";
import {useNavigate} from 'react-router-dom';
const AMENITIES = ["WiFi", "Parking", "Geyser", "AC", "Balcony"];

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya",
  "Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim",
  "Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand",
  "West Bengal","Delhi","Jammu and Kashmir","Ladakh","Puducherry"
];

const AddRoomForm = () => {
    const {navigate}=useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    propertyName: "",
    description: "",
    price: "",
    addressLine1: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    amenities: [],
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      toast.error("Maximum 3 images allowed");
      return;
    }
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    const data = new FormData();

    data.append("propertyName", formData.propertyName);
    data.append("description", formData.description);
    data.append("price", formData.price);

    data.append("address[addressLine1]", formData.addressLine1);
    data.append("address[landmark]", formData.landmark);
    data.append("address[city]", formData.city);
    data.append("address[state]", formData.state);
    data.append("address[pincode]", formData.pincode);

    formData.amenities.forEach((amenity) =>
      data.append("amenities[]", amenity)
    );

    images.forEach((img) => data.append("images", img));

    try {
      setLoading(true);
      const response = await addRoom(data);
      setLoading(false);

      if (response?.data?.success) {
        toast.success("Room added successfully");

        setFormData({
          propertyName: "",
          description: "",
          price: "",
          addressLine1: "",
          landmark: "",
          city: "",
          state: "",
          pincode: "",
          amenities: [],
        });
        setImages([]);
        navigate('/manage-rooms');
      } else {
        toast.error("Failed to add room");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center py-10 mt-20">
      <div className="w-full max-w-2xl rounded-xl border bg-white p-8 shadow-sm">
        <form onSubmit={handleSubmit}>
          <FieldGroup className="space-y-1">

            <div>
              <h2 className="text-2xl font-semibold">Add New Room</h2>
              <p className="text-sm text-muted-foreground">
                Fill in the details below to list a new room
              </p>
            </div>
            <FieldSet>
              <FieldLegend>Room Details</FieldLegend>

              <Field>
                <FieldLabel>Property Name</FieldLabel>
                <Input name="propertyName" required onChange={handleChange} placeholder="Enter property name" />
              </Field>

              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  name="description"
                  required
                  className="min-h-[100px]"
                  onChange={handleChange}
                placeholder="Describe the property and its features"
                />
              </Field>

              <Field>
                <FieldLabel>Price (per month)</FieldLabel>
                <Input
                  type="number"
                  name="price"
                  required
                  onChange={handleChange}
                    placeholder="Enter monthly rent amount"
                />
              </Field>
            </FieldSet>

            <FieldSet>
              <FieldLegend>Address</FieldLegend>

              <Field>
                <FieldLabel>Address Line 1</FieldLabel>
                <Input
                  name="addressLine1"
                  required
                  onChange={handleChange}
                    placeholder="Enter street address"
                />
              </Field>

              <Field>
                <FieldLabel>Landmark</FieldLabel>
                <Input name="landmark" onChange={handleChange}
                    placeholder="Enter nearby landmark"
                />

              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>City</FieldLabel>
                  <Input name="city" required onChange={handleChange} placeholder="Enter city" />
                </Field>

                <Field>
                  <FieldLabel>State</FieldLabel>
                  <select
                    name="state"
                    required
                    onChange={handleChange}
                    className="w-full rounded-md border px-3 py-2 text-sm"
                  >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field>
                <FieldLabel>Pincode</FieldLabel>
                <Input name="pincode" required onChange={handleChange} placeholder="Enter pincode" />
              </Field>
            </FieldSet>

            <FieldSet>
              <FieldLegend>Amenities</FieldLegend>
              <FieldDescription>Select available amenities</FieldDescription>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                {AMENITIES.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={formData.amenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </FieldSet>

            <FieldSet>
              <FieldLegend>Room Images</FieldLegend>

              <label className="mt-4 flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
                <UploadCloud />
                <span className="mt-2 text-sm">Click to upload images</span>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {images.map((file, index) => (
                <div
                  key={index}
                  className="mt-2 flex justify-between rounded border px-3 py-2 text-sm"
                >
                  {file.name}
                  <button type="button" onClick={() => removeImage(index)}>
                    <X className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              ))}
            </FieldSet>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Room"}
              </Button>
            </div>

          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default AddRoomForm;
