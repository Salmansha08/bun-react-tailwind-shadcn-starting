import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";

export const Birthdate = ({ state, handleChange, name }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Label htmlFor={name} className="text-left">
        Date of birth
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={name}
            className="w-full justify-between font-normal"
          >
            {state.value ? state.value.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={state.value}
            captionLayout="dropdown"
            onSelect={(date) => {
              handleChange(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </>
  )
}
