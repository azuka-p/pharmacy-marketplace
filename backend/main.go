package main

import (
	_ "github.com/joho/godotenv/autoload"
	"healthcare/server"
)

func main() {
	server.StartServer()
}
