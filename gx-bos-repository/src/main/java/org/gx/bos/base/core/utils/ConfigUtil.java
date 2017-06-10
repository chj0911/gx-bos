package org.gx.bos.base.core.utils;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;


/**
 * 
 * <p>
 * <b>ConfigUtil</b>配置文件读取工具类
 * </p>
 *
 * @since 2017年6月10日
 * @author ChanJun
 * @version $Id$
 */
public class ConfigUtil {
    private final static String SPRING_CONFIG = "/config.properties";
    private static Properties properties = new Properties();

    static {
        initial(null);
    }

    private static void initial(String path) {
        try {
            InputStream inputStream = null;
            try {
                if (path != null && !path.equals("")){
                    inputStream = new FileInputStream(path);
                    properties.load(inputStream);
                } else {
                    inputStream = ConfigUtil.class.getResourceAsStream(SPRING_CONFIG);
                    properties.load(inputStream);
                }
            } catch (Exception e) {
                throw e;
            }finally {
                if(inputStream != null){
                    inputStream.close();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 用key来查询配置清单中指定的配置文件路径，没值则返回空
     * @param key KEY值
     */
    public static String getRuntimeParam(String key) {
        String value = null;
        if (properties != null)
            value = properties.getProperty(key);
        return value;
    }
}
