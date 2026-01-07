FROM node:20-alpine

WORKDIR /app

# Copiamos dependencias
COPY package*.json ./

RUN npm install

# Copiamos código
COPY . .

# Compilamos TypeScript
RUN npm run build

EXPOSE 4000

CMD ["npm", "run", "start"]