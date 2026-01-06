import React, { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "react-toastify";
import { updateInquiryStatus } from "../../services/inquiryService";
import {useDispatch} from "react-redux";
import { triggerRefresh } from "@/redux/slices/inquirySlice";
import useGetAllMyInquiriesAdmin from "@/hooks/useGetAllMyInquiriesAdmin";
const UpdateInquiryStatus = ({ inquiryId, open, onOpenChange }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const dispatch=useDispatch();
  useGetAllMyInquiriesAdmin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateInquiryStatus(inquiryId, status);
      if (response.data.statusCode === 200) {
        toast.success("Inquiry status updated successfully 🎉");
        dispatch(triggerRefresh());
        onOpenChange(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Inquiry Status</DialogTitle>
            <DialogDescription>
              Make changes to your inquiry status. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="status">Status</Label>
              <RadioGroup
                value={status}
                className="flex flex-row gap-6"
                onValueChange={setStatus}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="pending" id="r1" />
                  <Label htmlFor="r1">Pending</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="confirmed" id="r2" />
                  <Label htmlFor="r2">Confirmed</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="cancelled" id="r3" />
                  <Label htmlFor="r3">Cancelled</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter className="space-x-2 space-y-2 mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={loading} onClick={() => setStatus("")}>
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
  );
};

export default UpdateInquiryStatus;
