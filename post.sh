git add .
read -p "Descrição: " desc
git commit -m "$desc"
git branch -M main
git remote add origin https://github.com/vailei/AltF4.git
git push -u origin main