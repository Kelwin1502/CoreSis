import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const InfoCIF = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Informasi CIF</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Cari berdasarkan nama atau nomor CIF"
            className="max-w-sm"
          />
          <Button variant="secondary">
            <Search className="w-4 h-4 mr-2" />
            Cari
          </Button>
        </div>

        <div className="rounded-md border">
          <div className="p-4">
            <p className="text-sm text-muted-foreground">Belum ada data CIF</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoCIF;
