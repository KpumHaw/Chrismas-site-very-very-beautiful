import javax.imageio.ImageIO;
import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ChristmasShop extends JFrame {

    private final JPanel productPanel = new JPanel();
    private final List<Product> products = new ArrayList<>();
    private final List<Product> cart = new ArrayList<>();
    private final JLabel cartCountLabel = new JLabel("0", SwingConstants.CENTER);
    private final Map<String, ImageIcon> imageCache = new HashMap<>();

    public ChristmasShop() {
        setTitle("Різдвяний магазин 2025 — Java Edition");
        setSize(1600, 1000);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        getContentPane().setBackground(new Color(10, 40, 25));

        initProducts();
        initUI();
        renderProducts("all");

        setVisible(true);
    }

    private void initProducts() {
        products.addAll(List.of(
            new Product("tree", "Ялинка Королівська 210 см", "https://i.imgur.com/8Qz7k1E.jpeg", 6990, 9990, "NEW", "• Висота: 210 см\n• Пишна преміум-ялинка\n• З шишками та ягодами\n• Металева підставка", "Найкраща ялинка! Дуже реалістична! ★★★★★"),
            new Product("tree", "Ялинка засніжена Скандинавська 180 см", "https://i.imgur.com/JmO3kPq.jpeg", 5290, 0, null, "• Ефект снігу\n• 1200 гілок\n• Стійка в комплекті", "Виглядає як справжня! ★★★★☆"),
            new Product("tree", "Ялинка лита Альпійська 240 см", "https://i.imgur.com/XkP9lWv.jpeg", 12490, 14990, "-16%", "• 100% лиття\n• 8 років гарантії\n• Пишна та міцна", "Королева ялинок! ★★★★★"),
            new Product("tree", "Міні ялинка в горщику з LED 90 см", "https://i.imgur.com/4pL8mXs.jpeg", 1990, 0, null, "• 100 LED лампочок\n• На батарейках", "Дуже мила! ★★★★☆"),
            new Product("lights", "Гірлянда 1000 LED тепле світло 50 м", "https://i.imgur.com/7pL2kXs.jpeg", 2190, 2990, "ХІТ", "• 1000 LED\n• 8 режимів\n• Вулична", "Світить казково! ★★★★★"),
            new Product("lights", "Гірлянда-штора 3×3 м 600 LED", "https://i.imgur.com/R5vM9pL.jpeg", 1490, 0, null, "• Холодне світло\n• 600 LED", "Дуже красиво на вікні!"),
            new Product("lights", "Гірлянда мідний дріт 10 м", "https://i.imgur.com/Z9kL3mP.jpeg", 399, 0, null, "• На батарейках\n• Гнучка", "Ідеально для декору!"),
            new Product("lights", "Світлодіодний олень 120 см", "https://i.imgur.com/Q2vR7kL.jpeg", 4990, 6500, "-23%", "• Для вулиці\n• 300 LED", "Вау-ефект на подвір'ї!"),
            new Product("decor", "Набір куль 120 шт червоно-золото", "https://i.imgur.com/3kLm9Px.jpeg", 1799, 0, null, "• Скло + пластик\n• 120 шт", "Елегантно та стильно!"),
            new Product("decor", "Верхівка Зірка з LED", "https://i.imgur.com/N6vP2kL.jpeg", 690, 0, null, "• 25 см\n• LED підсвітка", "Сяє як справжня зірка!"),
            new Product("decor", "Банти оксамитові червоні 20 шт", "https://i.imgur.com/T8kL4mP.jpeg", 890, 0, null, "• Оксамит\n• Великий розмір", "Дуже святково!"),
            new Product("other", "Різдвяний вінок на двері 50 см", "https://i.imgur.com/W1pL9kX.jpeg", 1490, 2200, "-32%", "• З шишками та ягодами\n• Натуральний вигляд", "Гості в захваті!"),
            new Product("other", "Проектор Снігопад", "https://i.imgur.com/E5vM7kL.jpeg", 2990, 0, null, "• LED проектор\n• Ефект снігопаду", "Казка в домі!"),
            new Product("other", "Адвент-календар з LED", "https://i.imgur.com/H9kL2mP.jpeg", 3490, 0, "ЛІМІТ", "• Дерево + LED\n• 24 віконця", "Діти в захваті!"),
            new Product("tree", "Ялинка настільна 60 см", "https://i.imgur.com/K3pL8mX.jpeg", 990, 0, null, "• З прикрасами\n• Готова до використання", "Ідеально на стіл!"),
            new Product("lights", "Гірлянда Метеоритний дощ", "https://i.imgur.com/M7vR4kL.jpeg", 1890, 0, null, "• 8 трубок\n• Ефект падіння", "Неймовірно красиво!"),
            new Product("decor", "Скляні іграшки ручної роботи", "https://i.imgur.com/P1kL6mP.jpeg", 3990, 0, "ЛЮКС", "• Чехія\n• Ручна робота", "Шедевр!"),
            new Product("other", "Свічки ароматичні Різдво 6 шт", "https://i.imgur.com/S4vP9kL.jpeg", 790, 0, null, "• Аромат хвої та кориці", "Атмосфера свята!"),
            new Product("other", "Плед з оленями 200×150 см", "https://i.imgur.com/U6kL3mP.jpeg", 1290, 0, null, "• М'який фліс\n• Теплий", "Затишок гарантовано!"),
            new Product("tree", "Ялинка біла засніжена 150 см", "https://i.imgur.com/V8pL5kX.jpeg", 4590, 5990, "-23%", "• Ефект снігу\n• Пишна", "Як у казці!"),
            new Product("lights", "Гірлянда RGB 300 LED з пультом", "https://i.imgur.com/X2vM7kL.jpeg", 1190, 0, null, "• Зміна кольорів\n• Пульт", "Супер!"),
            new Product("decor", "Фігурки Санта та сніговики", "https://i.imgur.com/Y4kL9mP.jpeg", 1250, 0, null, "• Набір 12 шт", "Дуже милі!"),
            new Product("other", "Санки декоративні 80 см", "https://i.imgur.com/Z6pL2kX.jpeg", 2850, 0, null, "• Дерево\n• Для фотозони", "Хіт фото!"),
            new Product("tree", "Ялинка класична зелена 180 см", "https://i.imgur.com/A8kL7mP.jpeg", 3990, 0, null, "• Класична форма\n• Пишна", "Традиція!"),
            new Product("lights", "Гірлянда вулична 400 LED", "https://i.imgur.com/B9vR3kL.jpeg", 1790, 2390, null, "• 20 метрів\n• Водонепроникна", "Надійно!"),
            new Product("decor", "Набір іграшок сині 80 шт", "https://i.imgur.com/C1kL5mP.jpeg", 1590, 0, null, "• Синьо-сріблястий стиль", "Елегантно!"),
            new Product("other", "Скатертина різдвяна", "https://i.imgur.com/D3vP8kL.jpeg", 990, 0, null, "• 150×220 см\n• З вишивкою", "Святковий стіл!"),
            new Product("other", "Набір серветок з вишивкою", "https://i.imgur.com/E5kL9mP.jpeg", 690, 0, null, "• 12 штук\n• Бавовна", "Дуже красиво!"),
            new Product("lights", "Сніжинка світлодіодна 60 см", "https://i.imgur.com/F7pL2kX.jpeg", 2190, 0, null, "• Для вікна чи фасаду", "Чарівно!"),
            new Product("other", "Подарунковий набір свічок", "https://i.imgur.com/G9vM4kL.jpeg", 1490, 0, "ПОДАРУНОК", "• 6 свічок + підсвічник", "Ідеальний подарунок!")
        ));
    }

    private void initUI() {
        // Заголовок
        JLabel title = new JLabel("Різдвяний магазин 2025", SwingConstants.CENTER);
        title.setFont(new Font("Segoe UI", Font.BOLD, 52));
        title.setForeground(Color.WHITE);
        title.setBorder(new EmptyBorder(30, 0, 20, 0));

        // Кошик
        JPanel topRight = new JPanel(new FlowLayout(FlowLayout.RIGHT));
        topRight.setOpaque(false);
        JLabel cartIcon = new JLabel("Кошик");
        cartIcon.setFont(new Font("Segoe UI", Font.BOLD, 36));
        cartIcon.setForeground(Color.WHITE);
        cartIcon.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        cartCountLabel.setFont(new Font("Segoe UI", Font.BOLD, 28));
        cartCountLabel.setForeground(Color.YELLOW);
        cartCountLabel.setBorder(BorderFactory.createEmptyBorder(0, 10, 0, 20));
        topRight.add(cartIcon);
        topRight.add(cartCountLabel);

        // Фільтри
        JPanel filterPanel = new JPanel();
        filterPanel.setOpaque(false);
        String[] cats = {"Всі товари", "Ялинки", "Гірлянди", "Прикраси", "Інше"};
        String[] keys = {"all", "tree", "lights", "decor", "other"};
        for (int i = 0; i < cats.length; i++) {
            JButton btn = new JButton(cats[i]);
            btn.setFont(new Font("Segoe UI", Font.BOLD, 16));
            String key = keys[i];
            btn.addActionListener(e -> renderProducts(key));
            btn.setPreferredSize(new Dimension(160, 50));
            filterPanel.add(btn);
        }

        // Сітка товарів
        productPanel.setLayout(new GridLayout(0, 4, 25, 25));
        productPanel.setBorder(new EmptyBorder(20, 40, 40, 40));
        productPanel.setOpaque(false);

        JScrollPane scroll = new JScrollPane(productPanel);
        scroll.setOpaque(false);
        scroll.getViewport().setOpaque(false);
        scroll.setBorder(null);

        // Додаємо все
        add(title, BorderLayout.NORTH);
        add(topRight, BorderLayout.NORTH);
        add(filterPanel, BorderLayout.CENTER);
        add(scroll, BorderLayout.CENTER);

        // Клік по кошику
        cartIcon.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                showCart();
            }
        });
    }

    private void renderProducts(String category) {
        productPanel.removeAll();
        for (Product p : products) {
            if (!category.equals("all") && !p.category.equals(category)) continue;
            productPanel.add(createCard(p));
        }
        productPanel.revalidate();
        productPanel.repaint();
    }

    private JPanel createCard(Product p) {
        JPanel card = new JPanel(new BorderLayout());
        card.setPreferredSize(new Dimension(340, 520));
        card.setBackground(Color.WHITE);
        card.setBorder(BorderFactory.createLineBorder(new Color(230, 230, 230), 1, true));
        card.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));

        // Фото
        JLabel imgLabel = new JLabel();
        imgLabel.setHorizontalAlignment(JLabel.CENTER);
        ImageIcon icon = getImage(p.imageUrl);
        if (icon != null) {
            Image scaled = icon.getImage().getScaledInstance(320, 320, Image.SCALE_SMOOTH);
            imgLabel.setIcon(new ImageIcon(scaled));
        } else {
            imgLabel.setText("Завантаження...");
        }

        // Бейдж
        if (p.badge != null) {
            JLabel badge = new JLabel(p.badge);
            badge.setForeground(Color.WHITE);
            badge.setBackground(p.badge.contains("%") || p.badge.contains("ХІТ") ? new Color(220, 53, 69) : new Color(255, 193, 7));
            badge.setOpaque(true);
            badge.setHorizontalAlignment(SwingConstants.CENTER);
            badge.setFont(new Font("Segoe UI", Font.BOLD, 14));
            badge.setBorder(new EmptyBorder(8, 16, 8, 16));

            JPanel topPanel = new JPanel(new BorderLayout());
            topPanel.setOpaque(false);
            topPanel.add(badge, BorderLayout.NORTH);
            topPanel.add(imgLabel, BorderLayout.CENTER);
            card.add(topPanel, BorderLayout.NORTH);
        } else {
            card.add(imgLabel, BorderLayout.NORTH);
        }

        // Інформація
        JPanel info = new JPanel();
        info.setLayout(new BoxLayout(info, BoxLayout.Y_AXIS));
        info.setBackground(Color.WHITE);
        info.setBorder(new EmptyBorder(20, 20, 20, 20));

        JLabel title = new JLabel("<html><b>" + p.title + "</b></html>");
        title.setFont(new Font("Segoe UI", Font.PLAIN, 17));
        title.setAlignmentX(Component.CENTER_ALIGNMENT);

        JLabel priceLabel = new JLabel(p.price + " ₴");
        priceLabel.setFont(new Font("Segoe UI", Font.BOLD, 32));
        priceLabel.setForeground(new Color(214, 51, 132));
        priceLabel.setAlignmentX(Component.CENTER_ALIGNMENT);

        JButton addBtn = new JButton("Додати в кошик");
        addBtn.setBackground(new Color(214, 51, 132));
        addBtn.setForeground(Color.WHITE);
        addBtn.setFont(new Font("Segoe UI", Font.BOLD, 16));
        addBtn.setMaximumSize(new Dimension(300, 50));
        addBtn.setAlignmentX(Component.CENTER_ALIGNMENT);
        addBtn.addActionListener(e -> {
            cart.add(p);
            cartCountLabel.setText(String.value
