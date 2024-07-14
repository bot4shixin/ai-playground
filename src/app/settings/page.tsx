"use client"
import {
  Share,
} from "lucide-react"
import {Nav} from "@/components/nav"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { CustomModel as  Model } from "@/types"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { nanoid } from "nanoid"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import * as StoreAtom from "@/lib/store/atom"
import { useAtom } from "jotai";

export default function() {
  const [models, setModels] = useAtom(StoreAtom.aiCustomModels);
  const addModel = async (model: Model) => {
    setModels(models => {
      return [...models, {
        ...model,
        id: nanoid()
      }]
    })
  }
  const updateModel = async (id: string, newModel: Model) => {
    setModels(
      models.map((model) => {
        if (model.id === id) {
          return newModel;
        }
        return model;
      })  
    )
  }
  const [editingModel, setEditingModel] = useState<Model>({
    name: "",
    apiPath: "",
    apiSecret: "",
    id: "",
    isDefault: false
  });

  return (
    <div className="grid min-h-screen w-full pl-[69px]">
      <Nav currentPath="/chat"/>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-10 flex min-h-[69px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">
            Settings
          </h1>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <Share className="size-3.5" />
              Share
          </Button>
        </header>
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 ">
          <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] ">
            <nav
              className="grid gap-4 text-sm text-muted-foreground sticky top-32" x-chunk="dashboard-04-chunk-0"
            >
              <Link href="/settings#general" className="font-semibold text-primary">
              General
              </Link>
              <Link href="/settings#security" scroll>Security</Link>
              <Link href="#">Integrations</Link>
              <Link href="#Support">Support</Link>
              <Link href="#">Organizations</Link>
              <Link href="#">Advanced</Link>
            </nav>
            <div className="grid gap-6">
              {/* <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                  <CardTitle>Store Name</CardTitle>
                  <CardDescription>
                  Used to identify your store in the marketplace.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <Input placeholder="Store Name" />
                  </form>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                  <Button>Save</Button>
                </CardFooter>
              </Card> */}
              <Card x-chunk="dashboard-04-chunk-1">
                <CardHeader>
                  <CardTitle>Integration</CardTitle>
                  <CardDescription>
                    Used to add Model to your playground. (date only store in your browser, no data is sent to the cloud)
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <h1>Models: </h1>
                  {models?.map((model) => (
                    <div key={model.id}>
                      <form className="gap-6 grid">
                        
                        <div className="flex items-center space-x-2 justify-between">
                          <Label> {model.name}</Label>
                          <div className="flex items-center">
                            <Checkbox id={model.id} defaultChecked={model.isDefault} onCheckedChange={(v) => {
                              console.log(v);
                              updateModel(model.id, {
                                ...model,
                                isDefault: !!v
                              })
                            }}/>
                            <label
                              htmlFor={model.id}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Default
                            </label>
                          </div>

                        </div>
                        <Input placeholder="Model Name" value={model.name} onInput = { (e) => setEditingModel(a =>{
                          return {
                            ...a,
                            name: (e.target as HTMLTextAreaElement).value || ''
                          }
                        })}/>
                        <Input placeholder="Model API Url" value={model.apiPath} onInput = { (e) => setEditingModel(a =>{
                          return {
                            ...a,
                            apiPath: (e.target as HTMLTextAreaElement).value || ''
                          }
                        })}/>
                        <Input placeholder="Model API Key" type="password" value={model.apiSecret} onInput = { (e) => setEditingModel(a =>{
                          return {
                            ...a,
                            apiSecret: (e.target as HTMLTextAreaElement).value || ''
                          }
                        })}/>
                      </form>
                      <Separator />
                      {/* <Button onClick={() => updateModel(model.id, editingModel)}>Save</Button> */}
                    </div>
                  ))}
                  <form className="gap-6 grid">
                    <Label>Add New AI API Gateway</Label>
                    <Input placeholder="Model Name"  onInput = { (e) => setEditingModel(a =>{
                      return {
                        ...a,
                        name: (e.target as HTMLTextAreaElement).value || ''
                      }
                    })}/>
                    <Input placeholder="Model API Url"  onInput = { (e) => setEditingModel(a =>{
                      return {
                        ...a,
                        apiPath: (e.target as HTMLTextAreaElement).value || ''
                      }
                    })}/>
                    <Input placeholder="Model API Key" type="password"  onInput = { (e) => setEditingModel(a =>{
                      return {
                        ...a,
                        apiSecret: (e.target as HTMLTextAreaElement).value || ''
                      }
                    })}/>
                    <Button onClick={() => addModel(editingModel)}>Add New Model</Button>
                  </form>
                </CardContent>
                {/* <CardFooter className="border-t px-6 py-4 gap-4">
                  
                </CardFooter> */}
              </Card>
             
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
  