import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

const genders = [
  { label: "Laki-laki", value: "L" },
  { label: "Perempuan", value: "P" },
];

const basicInfoSchema = z.object({
  name: z.string().min(1, { message: "Nama harus diisi" }),
  idNumber: z
    .string()
    .min(16, { message: "Nomor KTP harus 16 digit" })
    .max(16)
    .regex(/^\d+$/, { message: "Nomor KTP harus berupa angka" }),
  gender: z.string().min(1, { message: "Jenis kelamin harus dipilih" }),
  address: z.string().min(1, { message: "Alamat harus diisi" }),
  phone: z
    .string()
    .min(10, { message: "Nomor telepon minimal 10 digit" })
    .regex(/^\d+$/, { message: "Nomor telepon harus berupa angka" }),
});

const individualInfoSchema = z.object({
  occupation: z.string().min(1, { message: "Pekerjaan harus diisi" }),
  monthlyIncome: z
    .string()
    .min(1, { message: "Penghasilan bulanan harus diisi" }),
});

const businessInfoSchema = z.object({
  companyName: z.string().min(1, { message: "Nama perusahaan harus diisi" }),
  businessType: z.string().min(1, { message: "Jenis usaha harus diisi" }),
});

const formSchema = z.object({
  basicInfo: basicInfoSchema,
  individualInfo: individualInfoSchema,
  businessInfo: businessInfoSchema,
});

const AddCIF = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      basicInfo: {
        name: "",
        idNumber: "",
        gender: "",
        address: "",
        phone: "",
      },
      individualInfo: {
        occupation: "",
        monthlyIncome: "",
      },
      businessInfo: {
        companyName: "",
        businessType: "",
      },
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Tambah CIF</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Data Pokok</TabsTrigger>
                <TabsTrigger value="individual">Data Individu</TabsTrigger>
                <TabsTrigger value="business">Data Badan Usaha</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="basicInfo.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama lengkap" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="basicInfo.idNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor KTP</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nomor KTP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="basicInfo.gender"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Jenis Kelamin</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value
                                ? genders.find(
                                    (gender) => gender.value === field.value,
                                  )?.label
                                : "Pilih jenis kelamin"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Cari jenis kelamin..." />
                            <CommandEmpty>Tidak ditemukan.</CommandEmpty>
                            <CommandGroup>
                              {genders.map((gender) => (
                                <CommandItem
                                  value={gender.label}
                                  key={gender.value}
                                  onSelect={() => {
                                    form.setValue(
                                      "basicInfo.gender",
                                      gender.value,
                                      { shouldValidate: true },
                                    );
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      gender.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {gender.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="basicInfo.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan alamat" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="basicInfo.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nomor telepon"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="individual" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="individualInfo.occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pekerjaan</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan pekerjaan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="individualInfo.monthlyIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Penghasilan Bulanan</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan penghasilan bulanan"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="business" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="businessInfo.companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Perusahaan</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama perusahaan"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessInfo.businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Usaha</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan jenis usaha" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
            <Button type="submit" className="w-full mt-6">
              Simpan
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddCIF;
