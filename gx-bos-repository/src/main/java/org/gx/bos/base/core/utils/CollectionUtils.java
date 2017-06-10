package org.gx.bos.base.core.utils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.gx.bos.base.core.bean.GroupRel;
import org.springframework.data.domain.Persistable;

/**
 * 
 * <p>
 * <b>CollectionUtils</b>集合工具类
 * </p>
 *
 * @since 2017年6月10日
 * @author ChanJun
 * @version $Id$
 */
public class CollectionUtils {

	public static <T> boolean isNotEmpty(Iterable<T> iterable) {
		return iterable != null && iterable.iterator().hasNext();
	}

	public static <T> boolean isEmpty(Iterable<T> iterable) {
		return iterable == null || !iterable.iterator().hasNext();
	}

	public static <T> boolean isEmpty(T[] array) {
		return array == null || array.length == 0;
	}

	public static <T> boolean isNotEmpty(T[] array) {
		return array != null && array.length > 0;
	}


	/**
	 * 获取两个集合的交集
	 * */
	@SuppressWarnings("unchecked")
	public static <T> Collection<T> intersection(final Collection<T> a, final Collection<T> b) {
		return org.apache.commons.collections.CollectionUtils.intersection(a, b);
	}

	/**
	 * 获取实体中指定属性的集合
	 * */
	public static <E, V> List<V> getPropertiyList(Iterable<E> list, BeanWrapper<E, V> wrapper) {
		List<V> resultList = new ArrayList<>();
		if (isNotEmpty(list)) {
			for (E e : list) {
				if (e != null) {
					V v = wrapper.getValue(e);
					if (v != null) {
						resultList.add(v);
					}
				}
			}
		}
		return resultList;
	}

	/**
	 * 获取实体中指定属性的集合
	 * */
	public static <E, V> Set<V> getPropertiySet(Iterable<E> list, BeanWrapper<E, V> wrapper) {
		Set<V> resultSet = new HashSet<>();
		if (isNotEmpty(list)) {
			for (E e : list) {
				if (e != null) {
					V v = wrapper.getValue(e);
					if (v != null) {
						resultSet.add(v);
					}
				}
			}
		}
		return resultSet;
	}

	/**
	 * 计算实体中指定元素的和
	 * */
	public static <E> int sum(Iterable<E> list, BeanWrapper<E, Integer> wrapper) {
		int sum = 0;
		if (list != null) {
			for (E e : list) {
				sum = wrapper.getValue(e) + sum;
			}
		}
		return sum;
	}

	/**
	 * 对于Map中不存在的key,已空字符串填充
	 * */
	public static Map<String, Object> fillWithBlank(Map<String, Object> map, String... keys) {
		if (map == null)
			throw new IllegalArgumentException("map must be not null!");

		if (isNotEmpty(keys)) {
			for (String key : keys) {
				if (!map.containsKey(key)) {
					map.put(key, "");
				}
			}
		}
		return map;
	}

	/**
	 * 获取id集合
	 * */
	public static <E extends Persistable<Long>> List<Long> getIdList(Iterable<E> iterable) {
		List<Long> ids = new ArrayList<>();
		if (iterable != null) {
			for (E e : iterable) {
				ids.add(e.getId());
			}
		}
		return ids;
	}

	/**
	 * 获取id集合
	 * */
	public static <E extends Persistable<Long>> Set<Long> getIdSet(Iterable<E> iterable) {
		Set<Long> ids = new HashSet<>();
		if (iterable != null) {
			for (E e : iterable) {
				ids.add(e.getId());
			}
		}
		return ids;
	}

	/**
	 * 获取已id为key的Map
	 * */
	public static <E extends Persistable<Long>> Map<Long, E> getIdMap(Iterable<E> iterable) {
		Map<Long, E> map = new HashMap<>();
		if (iterable != null) {
			for (E e : iterable) {
				map.put(e.getId(), e);
			}
		}
		return map;
	}

	/**
	 * 转换集合为map,通过BeanWrapper指定key
	 * */
	public static <K, E extends Persistable<Long>> Map<K, E> getMap(Iterable<E> iterable, BeanWrapper<E, K> wrapper) {
		Map<K, E> map = new HashMap<>();
		if (iterable != null) {
			for (E e : iterable) {
				map.put(wrapper.getValue(e), e);
			}
		}
		return map;
	}

	/**
	 * 获取群组关系中id集合
	 * */
	public static <E extends GroupRel> List<Long> getGroupIdList(Iterable<E> it) {
		List<Long> list = new ArrayList<>();
		if (it != null) {
			for (E e : it) {
				list.add(e.getGroupId());
			}
		}
		return list;
	}

	/**
	 * 把集合中的元素类型转换成String
	 * */
	public static <T> List<String> toStringList(List<T> list) {
		if (list == null)
			return null;
		List<String> resultList = new ArrayList<>();
		for (T t : list) {
			resultList.add(t.toString());
		}
		return resultList;
	}

	/**
	 * 将数组中的所有元素添加到集合中
	 * */
	public static <E> Collection<E> addAll(Collection<E> collection, E[] array) {
		if (array != null && array.length > 0) {
			for (E e : array)
				collection.add(e);
		}
		return collection;
	}

	/**
	 * 通过指定属性值查找集合中的元素
	 * @param collection 待查找的集合
	 * @param wrapper 返回指定属性值的包装类
	 * @param key 查找的值
	 * @param 查找到的元素
	 * */
	public static <E, K> E findOneByProperty(Collection<E> collection, BeanWrapper<E, K> wrapper, K key) {
		E findElement = null;
		if (collection != null) {
			for (E e : collection) {
				if (key.equals(wrapper.getValue(e))) {
					findElement = e;
					break;
				}
			}
		}
		return findElement;
	}

	/**
	 * 通过指定属性值查找集合中的元素
	 * @param collection 待查找的集合
	 * @param wrapper 返回指定属性值的包装类
	 * @param key 查找的值
	 * @param 查找到的元素
	 * */
	public static <E, K> List<E> findByProperty(Collection<E> collection, BeanWrapper<E, K> wrapper, K key) {
		List<E> list = new ArrayList<>();
		if (collection != null) {
			for (E e : collection) {
				if (key.equals(wrapper.getValue(e))) {
					list.add(e);
				}
			}
		}
		return list;
	}

}
