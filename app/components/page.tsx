"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Check } from "lucide-react"

export default function AddListing() {
    const [components, setComponents] = useState<{ component_name: string }[]>([])
    const [types, setTypes] = useState<{ type: string }[]>([])
    const [selectedComponent, setSelectedComponent] = useState<string>("")
    const [selectedTypes, setSelectedTypes] = useState<string[]>([])

    const getComponents = async () => {
        try {
            const response = await fetch("/api/vendor/components", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) throw new Error(`Error: ${response.status}`)

            const data = await response.json()
            setComponents(data)
        } catch (error) {
            console.error("Failed to fetch components:", error)
        }
    }

    const getTypes = async () => {
        try {
            const response = await fetch("/api/vendor/types", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })

            if (!response.ok) throw new Error(`Error: ${response.status}`)

            const data = await response.json()
            setTypes(data)
        } catch (error) {
            console.error("Failed to fetch types:", error)
        }
    }

    const handleSubmit = async () => {
        const listingData: { component_name: string, types: string[] } = {
            component_name: selectedComponent,
            types: selectedTypes,
        }

        const response = await fetch("/api/vendor/components", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(listingData),
        })

        if (response.ok) {
            setSelectedComponent('')
            setTypes([])
        }
    }

    useEffect(() => {
        getTypes()
        getComponents()
    }, [])

    useEffect(() => {
        if (selectedComponent === "") return

        const getComponentTypes = async () => {
            try {
                const response = await fetch(`/api/vendor/component-types?component_name=${selectedComponent}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                if (!response.ok) throw new Error(`Error: ${response.status}`)

                const data = await response.json()
                setSelectedTypes(data.map((type: { type: string }) => {
                    console.log(type)
                    return (type.type)
                }))
            } catch (error) {
                console.error("Failed to fetch components types:", error)
            }
        }

        getComponentTypes()
    }, [selectedComponent])

    return (
        <div className="container max-w-2xl py-10">
            <Card>
                <CardContent className="grid p-0">
                    <div className="flex flex-col gap-3 p-6">
                        <CardTitle>Manage Components</CardTitle>

                        <div>
                            <Label>Component</Label>
                            <Select
                                value={selectedComponent}
                                onValueChange={(value) => {
                                    setSelectedComponent(value)
                                    setSelectedTypes([])
                                }}
                            >
                                <div className="grid grid-cols-[1fr,auto] gap-2">
                                    <Input
                                        value={selectedComponent}
                                        onChange={(e) => setSelectedComponent(e.target.value)}
                                        onClick={(e) => e.preventDefault()}
                                    />
                                    <SelectTrigger>
                                    </SelectTrigger>
                                </div>

                                <SelectContent>
                                    {components.map((component) => (
                                        <SelectItem key={component.component_name} value={component.component_name}>
                                            {component.component_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {!!types.length && (
                            <div>
                                <Label>Listing Types</Label>
                                <Select
                                    value=""
                                    onValueChange={(value) =>
                                        selectedTypes.includes(value)
                                            ? setSelectedTypes((prev) => prev.filter((type) => type !== value))
                                            : setSelectedTypes((prev) => [...prev, value])
                                    }
                                >
                                    <SelectTrigger>
                                        {!!selectedTypes.length ? selectedTypes.toString().replaceAll(",", ", ") : "Select Types"}
                                    </SelectTrigger>

                                    <SelectContent>
                                        {types.map((type) => (
                                            <SelectItem key={type.type} value={type.type}>
                                                <div className="flex gap-2">
                                                    <span>{type.type}</span>
                                                    {selectedTypes.includes(type.type) && <Check className="mt-[2px] w-4 h-4" />}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        <div className="w-full justify-end flex pt-3">
                            <Button disabled={selectedComponent === "" || !selectedTypes.length} onClick={handleSubmit}>
                                Update Component Types
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
