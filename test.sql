/*
SQLyog Community v13.2.1 (64 bit)
MySQL - 8.0.13 
*********************************************************************
*/
/*!40101 SET NAMES utf8 */;

create table `recipe_list` (
	`id` int (11),
	`recipe_name` varchar (765),
	`recipe_desc` text ,
	`img_path` text 
); 
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('1','Tomato Soup','A warm and comforting tomato soup, perfect for chilly days','tomato.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('2','Masala Dosa','Crispy and golden, a timeless favorite on every plate.','dosa.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('3','Idli and Sambar','Soft, fluffy idlis served with spicy, flavorful sambar','idli_with_sambar.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('4','Vegetable Salad','A fresh and vibrant salad, perfect for a healthy meal.','vegsalad.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('5','Chocolate Cake','A rich and moist chocolate cake, perfect for dessert lovers.','chocolatecake.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('6','Coffee','A rich, bold coffee brewed for the perfect pick-me-up','coffee.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('7','Orange Juice','A refreshing, tangy juice packed with vitamin C','orange_juice.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('8','Paneer Butter Masala','A smooth and flavorful curry with paneer and butter.','paneer.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('9','Masala Chai','A spiced, aromatic tea with a perfect blend of Indian spices','masala_chai.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('10','Uttapam','Savory rice pancakes topped with chopped vegetables.','uttapam.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('11','Banana Smoothie','A creamy and sweet smoothie made with ripe bananas and a touch of honey','banana_smoothie.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('12','Beetroot Juice','A vibrant, healthy juice with the earthy taste of beetroot','beetroot_juice.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('13','Lemon and Mint Juice','A cool, zesty blend of lemon and fresh mint','lemon_mint_juice.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('14','Wheat Pizza','Healthy whole wheat pizza topped with veggies and cheese.','wheat_pizza.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('15','Berry Smoothie','A refreshing smoothie made with mixed berries and yogurt','berry_smoothie.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('16','Wheat Burger','A healthy burger with a whole wheat bun and veggie patty.','wheat_burger.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('17','Mango Juice','A smooth, tropical juice made from ripe mangoes','mango_juice.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('18','Brownie','A soft and chewy chocolate brownie, rich and indulgent.','brownie.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('19','Veg Noodles','Stir-fried noodles with colorful vegetables and soy sauce.','noodles.png');
insert into `recipe_list` (`id`, `recipe_name`, `recipe_desc`, `img_path`) values('20','Green Tea','A light, soothing tea packed with antioxidants','green_tea.png');
